const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.static("ext_libs/"));
app.use(express.json({ limit: '200mb' }));

// Connect to SQLite database
let db = new sqlite3.Database('./my_database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS MyTable (key TEXT UNIQUE, value TEXT)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Table created if it did not exist.');
});

app.get('/notesViewer', (req, res) => {
  res.sendFile(__dirname + '/notes.html');
});

app.get('/pdf.html', (req, res) => {
  res.sendFile(__dirname + '/pdf.html');
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

    console.log("Data found: ", result);
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

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
