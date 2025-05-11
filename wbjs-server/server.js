const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const app = express();
var cors = require('cors')
const formidable = require('formidable');

const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');
const { stdin: input, stdout: output } = require('node:process');
const readline = require('readline');


app.use(cors({credentials: true}))
app.use(express.static("ext_libs/"));
app.use('/notes', express.static('notes'))
app.use('/notes/videos/', express.static('notes/videos'))

app.use(express.json({ limit: '200mb' }));



// Connect to SQLite databases
let db = new sqlite3.Database('./my_database.db', err => {
  err ? console.error(err.message) : console.log('Connected to the SQLite database.')
});

let dbTags = new sqlite3.Database('./tags.db', err => {
  err ? console.error(err.message) : console.log('Connected to the tags database.');
});

let dbReadability = new sqlite3.Database('./readability.db', err => { 
  err ? console.error(err.message) : console.log('Connected to the readability database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS MyTable (key TEXT UNIQUE, value TEXT)`, (err) => {
  err ? console.error(err.message) : console.log('Table created if it did not exist.')
});
// Create table if not exists
dbTags.run(`CREATE TABLE IF NOT EXISTS MyTable (key TEXT UNIQUE, value TEXT)`, (err) => {
  err?  console.error(err.message) : console.log('Table created if it did not exist.')
});

dbReadability.run(`CREATE TABLE IF NOT EXISTS MyTable (key TEXT UNIQUE, value TEXT)`, (err) => {
  err?  console.error(err.message) : console.log('Table created if it did not exist.')
});

///// Static webpages  //////
app.get('/notesViewer', (req, res) => {
  res.sendFile(__dirname + '/notes.html');
});
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get('/pdf.html', (req, res) => {
  res.sendFile(__dirname + '/pdf.html');
});

app.get('/video.html', (req, res) => {
  res.sendFile(__dirname + '/video.html');
});

let registeredExtensions = [] 
// Load registered users from file
fs.readFile('registeredUsers.json', 'utf8', (err, data) => {
  if (err) {
      console.error('Error reading file:', err);
      return;
  }
  registeredExtensions = JSON.parse(data);
  console.log("Users registered: ", registeredExtensions);
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

app.get('/videoViewer', (req, res) => {
  // glob video files from folder
  const folderPath = path.join(__dirname, 'notes', 'videos');
  fs.readdir(folderPath, (err, files) => {
      if (err) {
          console.error('Error reading folder:', err);
      }
      const videoFiles = files.filter(file => file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.ogg'));

      // generate html content
      const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Saved Videos</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
              }
              .video-container {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  gap: 20px;
              }
              .video-item {
                  width: 300px;
                  text-align: center;
              }
              .thumbnail {
                  width: 100%;
                  height: auto;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  cursor: pointer;
              }
              a {
                  text-decoration: none;
                  color: black;
              }
              a:hover {
                  color: blue;
              }
          </style>
      </head>
      <body>
          <h1 style="text-align:center">Saved Videos</h1>
          <div class="video-container">
            ${videoFiles.map(videoFile => `
              <div class="video-item">
                  <video src="/notes/videos/${encodeURI(videoFile)}" alt="${videoFile}" width=100%></video>
                  <h4> <a href="/video.html?videoUrl=${encodeURI(`notes/videos/${videoFile}`)}" target="_blank">${videoFile}
                  </a> </h4>
              </div>
            `).join('')}
          </div>
      </body>
      </html>
      `;
      res.send(htmlContent);
  });
});
// Blank canvas for user to take notes 
app.get('/canvas', (req, res) => {

  // require user to provide title
  const title  = req.query.title;
  if (!title) {
      res.status(400).send('Error. Could not make canvas. Title is required. Try again with a title. Example:http://127.0.0.1:3000/canvas?title=MyNotes');
      return;
  }

  const uniqueId = Date.now();
  const fileName = `page_${uniqueId}.html`;
  const filePath = path.join('notes', fileName);

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
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
      res.redirect(HOSTSTRING + `/notes/${fileName}`);
  });
});
////////////////////////////





//Post process the database
function processDB(key=""){

  if(key.length > 0){
    //If key is provided, then we will only process that key
    let sql = `SELECT * FROM MyTable WHERE key = ?`;

    db.all(sql, [key], (err, rows) => {
      rows.forEach((row, index) => {
        try{
          let val  = JSON.parse(row['value']);
          let sqlTags = `REPLACE INTO MyTable (key, value) VALUES (?, ?)`;
          dbTags.run(sqlTags, [row['key'], val['TAGS']], function(err) {
            if (err) {
              console.error(err.message);
            }
          });
  
        }catch(e){
          console.error(e);
          console.log("Error parsing tags for key: "+row['key']);
          console.log("Ignoring this key"); 
        }
      });
    });
  }
  else{
    let sql = `SELECT * FROM MyTable`;

    // Delete existing table if it exists
    // dbTags.run(`DROP TABLE IF EXISTS MyTable`, (err) => {});  

    db.all(sql, [], (err, rows) => {
      rows.forEach((row, index) => {
        try{
          let val  = JSON.parse(row['value']);
          let sqlTags = `REPLACE INTO MyTable (key, value) VALUES (?, ?)`;
          dbTags.run(sqlTags, [row['key'], val['TAGS']], function(err) {
            if (err) {
              console.error(err.message);
            }
          });
  
        }catch(e){
          console.error(e);
          console.log("Error parsing tags for key: "+row['key']);
          console.log("Ignoring this key"); 
        }
      });
    });
  }

}

processDB(key="");


function processToken(token){
  for(let i=0; i<registeredExtensions.length; i++){
    if(token === registeredExtensions[i]){
      return true;
    }
  }
  return false;
}


app.post('/getAll', (req, res) => {
  //First authenticate user using header token
  let token = req.headers['token'];
  if(processToken(token)){
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
  }
});

// Endpoint to get all tags from database
app.post('/getAllTags', (req, res) => {

  let sql = `SELECT * FROM MyTable`;

  dbTags.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    let result = {};
    rows.forEach((row, index) => {
      //Remove whitespaces 
      let tags = row['value'].replace(/\s/g, '');
      //Now split the tags
      let tagsSplit = tags.split(",");
      tagsSplit.forEach((tag, index) => {
        if (!result[tag]) {
          result[tag] = [];
        }
        result[tag].push(row['key']);
      });
    });
    // Get all keys 
    let keys = Object.keys(result);
    keys.sort();

    // Find how many times each tag is used
    let occurences = [];
    keys.forEach((key, index) => {
      occurences.push(result[key].length);
    });

    let sortedResult = {'tags': keys, 'occurences': occurences};
    res.json(sortedResult);
  });
});

// Endpoint to get data from database
app.post('/getData', (req, res) => {
  let token = req.headers['token'];
  // console.log(processToken(token)); 
  if(processToken(token)){

    let key = req.body.key;
    // search key in database
    let sql = `SELECT * FROM MyTable WHERE key = ?`;
    db.get(sql, [key], (err, row) => {
        if (err) {
            throw err;
        }
        // console.log("data found");
        res.json(row);
        
        });
  }
});

const ignoredWebsites = {
  email: [
    "mail.google.com", 
    "outlook.live.com", 
    "mail.yahoo.com", 
    "www.icloud.com/mail", 
    "www.protonmail.com", 
    "mail.aol.com", 
    "www.zoho.com/mail", 
    "www.gmx.com", 
    "www.fastmail.com", 
    "www.tutanota.com", 
    "mail.com", 
    "www.runbox.com"
  ],
  banks: [
    "www.chase.com", 
    "www.bankofamerica.com", 
    "www.wellsfargo.com", 
    "www.citi.com", 
    "www.usbank.com", 
    "www.capitalone.com", 
    "www.pnc.com", 
    "www.tdbank.com", 
    "www.suntrust.com", 
    "www.bbt.com", 
    "www.regions.com", 
    "www.schwab.com", 
    "www.fidelity.com", 
    "www.paypal.com", 
    "www.ally.com", 
    "www.discover.com", 
    "www.hsbc.com", 
    "www.usaa.com"
  ]
};

function isUrlInIgnoredWebsites(url) {
  const urlDomain = url.replace(/https?:\/\//, "").split("/")[0]; // Extract domain from URL
  for (const category in ignoredWebsites) {
    if (ignoredWebsites[category].includes(urlDomain)) {
      return true;
    }
  }
  return false;
}

app.post('/readability', (req, res) => {

  let bodyHTML = req.body.bodyHTML;

  var doc = new JSDOM(bodyHTML);
  let reader = new Readability(doc.window.document);
  let article = reader.parse();
  //Store the article in the database
  let sql = `INSERT INTO MyTable VALUES (?, ?)`;
  if(isUrlInIgnoredWebsites(req.body.url)){
    dbReadability.run(sql, [req.body.url, JSON.stringify(article)], function(err) {
      if (err) {
        if(err.message.includes('UNIQUE constraint failed')){ 
          console.log('Key already exists. Updating value.');
          let sqlUPDATE = `UPDATE MyTable SET value = ? WHERE key = ?`;
          dbReadability.run(sqlUPDATE, [JSON.stringify(article), req.body.url], function(err) {
            if (err) {
              console.error(err.message);
            }
          });
        }
      }
    });
  }
  try {
    res.json({textContent: article.textContent});
    
  } catch (error) {
    console.error("Error parsing article: ", error);
    // Handle the error gracefully
    res.json({textContent: ""});

  }
});  

// Endpoint to search data from database

app.post('/search', (req, res) => {
  let tagFlag = req.body.tag;
  let key     = "";
  if(tagFlag){
    key = "%" + req.body.key + ",%";
  }
  else{
    // Check if the key is a url 
    if(req.body.key.includes("/")){
      key = "%" + req.body.key + "%";
    }
    else{
      key = "%" + req.body.key + " %";
    }
  }

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
  let key = "%" + searchString + " %";
  // console.log("user from WBJS asked to search for : "+key);

  let sql = `SELECT * FROM MyTable WHERE value LIKE ?`;

    db.all(sql, [key], (err, rows) => {
      if (err) {
        throw err;
      }

      let itemsPacked = [];
      rows.forEach((row, index) => {

        try{
          let resultFoo = {};
          resultFoo["href"] = HOSTSTRING + "/notesViewer?q=" + row['key'];
          let val  = JSON.parse(row['value']);
          // console.log(val);
          resultFoo["name"] = val['TITLE'];
          resultFoo["description"] = val['TAGS'];

          itemsPacked.push(resultFoo);
        }catch(e){
          console.error(e);
        }

      });
      const result = {
        success: true,
        items: itemsPacked
      };

      // console.log(result);
      res.setHeader('Content-Type', 'application/json');
      res.json(result);
    });
  });


// Endpoint to attach files

app.post('/uploadFile', (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, 'notes');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log('Uploading error', err);
      return res.status(500).json({ success: 0 });
    }

    const file = files['file'][0];
    if (!file || !file.filepath || !file.originalFilename) {
      console.log('File upload error: file, file.filepath, or file.originalFilename is undefined');
      return res.status(400).json({ success: 0, message: 'File upload error' });
    }

    const oldPath = file.filepath;
    const newPath = path.join(__dirname, 'notes', file.originalFilename);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
        return res.status(500).send('Server Error');
      }

      //If file is a pdf, then we will show it in the pdf viewer
      if (file.originalFilename.endsWith('.pdf')) {
        var responseJson = {
          success: 1,
          file: {
            url: HOSTSTRING + "/pdf.html?pdfUrl=notes/" + file.originalFilename,
            name: file.originalFilename,
            size: file.size,
            title: file.originalFilename
          }
        };  
      }

      else{
        var responseJson = {
          success: 1,
          file: {
            url: HOSTSTRING + "/notes/" + file.originalFilename,
            name: file.originalFilename,
            size: file.size,
            title: file.originalFilename
          }
        };
      }
      res.status(200).json(responseJson);
    });
  });
});

// Endpoint to add data to database
app.post('/data', (req, res) => {

  let token = req.headers['token'];
  if(processToken(token)){

    let data = req.body;
    let key  = Object.keys(data)[0];
    let value = data[key];
    // console.log(req.body);
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
    // process the database 
    processDB(key);
  }
});



HOSTSERVER = "127.0.0.1"
HOSTPORT   = 3000
HOSTSTRING = 'http://' + HOSTSERVER + ":" + HOSTPORT

// Start server
app.listen(HOSTPORT,HOSTSERVER, () => {
  console.log('Server is running on port' + HOSTPORT);
});
