const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const app = express();
var cors = require('cors')

app.use(cors({credentials: true, origin: true}))
app.use(express.static("ext_libs/"));
app.use('/notes', express.static('notes'))
app.use(express.json({ limit: '200mb' }));

// Connect to SQLite database
let db = new sqlite3.Database('./my_database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  else{
    console.log('Connected to the SQLite database.');
  }
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS MyTable (key TEXT UNIQUE, value TEXT)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  else{
    console.log('Table created if it did not exist.');
  }
});

app.get('/notesViewer', (req, res) => {
  res.sendFile(__dirname + '/notes.html');
});
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get('/pdf.html', (req, res) => {
  res.sendFile(__dirname + '/pdf.html');
});

app.get('/pdfViewer', (req, res) => {
  // glob pdf files from folder
  const folderPath = path.join(__dirname, 'notes');
  fs.readdir(folderPath, (err, files) => {
      if (err) {
          console.error('Error reading folder:', err);
      }
      const pdfFiles = files.filter(file => file.endsWith('.pdf'));

      // generate html content
      const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Saved PDFs</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
              }
              .pdf-link {
                  display: block;
                  margin-bottom: 10px;
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <h1 style="text-align:center">Saved PDFs
            ${pdfFiles.map(pdfFile => `<h4><a class="pdf-link" href="/pdf.html?pdfUrl=/notes/${pdfFile}" target="_blank">${pdfFile}</a></h4>`).join('')}
          </h1>
      </body>
      </html>
      `;
      res.send(htmlContent);
  }
  );
});




app.post('/getAll', (req, res) => {
  let sql = `SELECT * FROM MyTable`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    let result = {};
    rows.forEach((row, index) => {
      result[row['key']] = row['value'];
    });

    // console.log("Data found: ", result);
    res.json(result);
  });
});

// Endpoint to get data from database
app.post('/getData', (req, res) => {
  let key = req.body.key;
  console.log("user asked for data with key: "+key);
  // search key in database
  let sql = `SELECT * FROM MyTable WHERE key = ?`;
    db.get(sql, [key], (err, row) => {
        if (err) {
            throw err;
        }
        console.log("data found");
        res.json(row);
        
        });
});

// Endpoint to search data from database

app.post('/search', (req, res) => {
  let key = "%" + req.body.key + "%";
  console.log("user asked to search for : "+key);

  let sql = `SELECT * FROM MyTable WHERE value LIKE ?`;

  db.all(sql, [key], (err, rows) => {
    if (err) {
      throw err;
    }

    let result = {};
    rows.forEach((row, index) => {
      result[row['key']] = row['value'];
    });

    res.json(result);
  });
});


//End point for EDJS search
app.get('/searchWBJS', (req, res) => {
  const searchString = req.query.search
  let key = "%" + searchString + "%";
  console.log("user from WBJS asked to search for : "+key);

  let sql = `SELECT * FROM MyTable WHERE value LIKE ?`;

  db.all(sql, [key], (err, rows) => {
    if (err) {
      throw err;
    }

    let itemsPacked = [];
    rows.forEach((row, index) => {
      let resultFoo = {};
      resultFoo["href"] = "http://0.0.0.0:3000/notesViewer?q=" +  row['key']; // link to the search page instead of the row['key']
      let val  = JSON.parse(row['value']);
      console.log(val);
      resultFoo["name"] = val['TITLE'];

      itemsPacked.push(resultFoo);

    });
    const result = {
      success: true,
      items: itemsPacked
    };

    console.log(result);
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
  });
});

// Endpoint to add data to database
app.post('/data', (req, res) => {
  let data = req.body;
  let key  = Object.keys(data)[0];
  let value = data[key];
  console.log(req.body);
  let sql = `INSERT INTO MyTable VALUES (?, ?)`;
  db.run(sql, [key, value], function(err) {
    if (err) {
      console.error(err.message);
      // If key already exists, update the value
        if (err.message.includes('UNIQUE constraint failed')) {
            console.log('Key already exists. Updating value.');
            let sqlUPDATE = `UPDATE MyTable SET value = ? WHERE key = ?`;
            db.run(sqlUPDATE, [value, key], function(err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).send('Internal server error');
                    return;
                }
                res.json({ id: this.lastID });
            });
         }
        } else {
            res.json({ id: this.lastID });
        }
  });
});


// Blank canvas for user to take notes 

app.get('/canvas', (req, res) => {
  const uniqueId = Date.now();
  const fileName = `page_${uniqueId}.html`;
  const filePath = path.join('notes', fileName);

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>WBJS Canvas</title>
      <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
      </style>
  </head>
  <body>
      <div height="10000px" width="100%" id="wbjs-canvas" style="overflow-y:auto;background-color: #f4f4f4;">${"&nbsp;<br>".repeat(100) }</div>
  </body>
  </html>
  `;
  fs.writeFile(filePath, htmlContent, (err) => {
      if (err) {
          console.error('Error writing file:', err);
          res.status(500).send('Server Error');
          return;
      }
      res.redirect(`http://127.0.0.1:3000/notes/${fileName}`);
  });
});



// Start server
app.listen(3000,"127.0.0.1", () => {
  console.log('Server is running on port 3000');
});
