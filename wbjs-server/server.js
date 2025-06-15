const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const app = express();
var cors = require('cors')
const formidable = require('formidable');
const crypto = require('crypto');
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');
const { stdin: input, stdout: output } = require('node:process');
const readline = require('readline');
// const fetch = require("node-fetch");
const logger = require('log-timestamp');
const { add } = require('@neutralinojs/neu/src/plugins/pluginloader');
const { KeyObject } = require('node:crypto');
const https = require('https');
const { url } = require('node:inspector');

HOSTSERVER = "127.0.0.1"
HOSTPORT   = 3000
HOSTSTRING = 'http://' + HOSTSERVER + ":" + HOSTPORT
// LLMWBJSserver = "http://127.0.0.1:11434/api/chat";



app.use(cors({credentials: true}))
app.use(express.static("ext_libs/"));
app.use('/notes', express.static('notes'))
app.use('/notes/audios/', express.static('notes/audios'))
app.use('/notes/docs/', express.static('notes/docs'))
app.use('/notes/images/', express.static('notes/images'))
app.use('/notes/pages/', express.static('notes/pages'))
app.use('/notes/videos/', express.static('notes/videos'))

app.use(express.json({ limit: '200mb' }));



/////////////// Connect to SQLite databases ////////////////////////
let db = new sqlite3.Database('./my_database.db', err => {
  err ? console.error(err.message) : console.log('[DB] Connected to the SQLite database.')
});
let dbClean = new sqlite3.Database('./my_database_clean.db', err => {
  err ? console.error(err.message) : console.log('[DB] Connected to the SQLite database.')
});

let dbReadability = new sqlite3.Database('./readability.db', err => {
  err ? console.error(err.message) : console.log('[DB] Connected to the readability database.');
});

let dbUsers = new sqlite3.Database('./registeredUsers.db', err => {
  err ? console.error(err.message) : console.log('[DB] Connected to the registered users database.')
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS MyTable (key TEXT UNIQUE, value TEXT)`, (err) => {
  err ? console.error(err.message) : console.log('[DB] Table created if it did not exist.')
});
dbClean.run(`CREATE TABLE IF NOT EXISTS MyTable (key TEXT UNIQUE, uid TEXT, title TEXT, tags TEXT, notes TEXT, notesText TEXT, summary TEXT, user TEXT, css TEXT, meta TEXT, value TEXT)`, (err) => {
  err ? console.error(err.message) : console.log('[DB] Table created if it did not exist.')
});
//Delete all entries in the table 
dbClean.run(`DELETE FROM MyTable`, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('[DB] Table MyTable cleaned.');
  }
});

dbReadability.run(`CREATE TABLE IF NOT EXISTS MyTable (key TEXT UNIQUE, input TEXT, html TEXT, text TEXT, excerpt TEXT, title TEXT, length INT)`, (err) => {
  err?  console.error(err.message) : console.log('[DB] Table created if it did not exist.')
});

dbUsers.run(`CREATE TABLE IF NOT EXISTS MyTable (username TEXT UNIQUE, password TEXT, token TEXT)`, (err) => {
  err ? console.error(err.message) : console.log('[DB] Table created if it did not exist.')
});

///////////////////// USEFUL FUNCTIONS /////////////////
function processToken(token){
  for(let i=0; i<registeredExtensions.length; i++){
    if(token === registeredExtensions[i]){
      return true;
    }
  }
  return false;
}

//Post process the database
function processDB(key=""){
    if(key.length === 0){ 
      let sql = `SELECT * FROM MyTable`;

      // Update dbClean database
      db.all(sql, [], (err, rows) => {
        rows.forEach((row, rowIdx) => {
          try{
            let val  = JSON.parse(row['value']);          

            let key = row['key'];

            let uid = crypto.createHash('md5').update(row['key']).digest('hex');
              
            let title = val['TITLE'] || "";
            let tags = val['TAGS'] || "";
            let value  = row['value'] || "";

            let notesText = "";


            let cleanedNotes = val["JSON"];
            // Remove all the Images from the notes to make it easier to search
            let cleanedNotesKeys = Object.keys(cleanedNotes);
            cleanedNotesKeys.forEach((key, index) => {
              let blocks = cleanedNotes[key]["blocks"];
              blocks.forEach((block,blockindex) => {
                if(block['type'] === 'image'){
                    // Write the image to a file 
                    let imageUrl = block['data']['url'];
                    let base64Data = imageUrl.replace(/^data:image\/png;base64,/, "");
                    let imageSave = path.join(__dirname, 'notes', 'images', uid + "_" + index + "_" + blockindex + ".png");
                    

                    fs.writeFile(imageSave, base64Data, 'base64', function(err) {
                      console.error(err);
                    });
                    
                    // Replace the url with the saved image path
                    cleanedNotes[key]["blocks"][blockindex]["data"]["url"] = HOSTSERVER + ":" + HOSTPORT + "/notes/images/" + uid + "_" + index + "_" + blockindex + ".png";
                  }
                  if(block['type'] === 'paragraph' || block['type'] === 'header'){
                    notesText += block['data']['text'] + "\n";
                  }
                  if(block['type'] === 'code'){
                    notesText += block['data']['code'] + "\n";
                  }
                  if(block['type'] === 'list'){
                    notesText += block['data']['items'].join("\n") + "\n";
                  }


              });
            });
            // If key contains video, canvas or pdf , then we will use the notesText as the title 
            if(key.includes("127.0.0.1:3000/video.html?") || key.includes("127.0.0.1:3000/notes/") || key.includes("127.0.0.1:3000/pdf.html?")){
              title = notesText.slice(0, 120); // Take first 50 characters as title

              let valFoo = JSON.parse(row['value']);
              // Update the title in the value
              valFoo['TITLE'] = title;

              value = JSON.stringify(valFoo);
            }

            let notes = JSON.stringify(cleanedNotes) || "";
            let summary= "";
            let user = "root";
            let css =  JSON.stringify(val['CSS']) || ""; 
            let meta = JSON.stringify(val['META']) || "";
            let sqlTags = `REPLACE INTO MyTable (key, uid, title, tags, notes, notesText, summary, user, css, meta, value) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
            dbClean.run(sqlTags, [key,uid, title, tags, notes, notesText, summary, user, css, meta, value], function(err) {
              if (err) {
                console.error(err.message);
              }
            });
    
    
          }catch(e){
            console.error(e);
            console.log("[PROCESSDB] Error parsing tags for key: "+row['key']);
            console.log("[PROCESSDB] Ignoring this key"); 
          }
        });
      });

    }
    else{
      // If key is provided, then we will only process that key
      let sql = `SELECT * FROM MyTable WHERE key = ?`;

      // Update dbClean database
      db.all(sql, [key], (err, rows) => {
        rows.forEach((row, rowIdx) => {
          try{
            let val  = JSON.parse(row['value']);          

            let key = row['key'];

            let uid = crypto.createHash('md5').update(row['key']).digest('hex');
              
            let title = val['TITLE'] || "";
            let tags = val['TAGS'] || "";
            let value  = row['value'] || "";

            let notesText = "";


            let cleanedNotes = val["JSON"];
            // Remove all the Images from the notes to make it easier to search
            let cleanedNotesKeys = Object.keys(cleanedNotes);
            cleanedNotesKeys.forEach((key, index) => {
              let blocks = cleanedNotes[key]["blocks"];
              blocks.forEach((block,blockindex) => {
                if(block['type'] === 'image'){
                    // Write the image to a file 
                    let imageUrl = block['data']['url'];
                    let base64Data = imageUrl.replace(/^data:image\/png;base64,/, "");
                    let imageSave = path.join(__dirname, 'notes', 'images', uid + "_" + index + "_" + blockindex + ".png");
                    

                    fs.writeFile(imageSave, base64Data, 'base64', function(err) {
                      console.error(err);
                    });
                    
                    // Replace the url with the saved image path
                    cleanedNotes[key]["blocks"][blockindex]["data"]["url"] = HOSTSERVER + ":" + HOSTPORT + "/notes/images/" + uid + "_" + index + "_" + blockindex + ".png";
                  }
                  if(block['type'] === 'paragraph' || block['type'] === 'header'){
                    notesText += block['data']['text'] + "\n";
                  }
                  if(block['type'] === 'code'){
                    notesText += block['data']['code'] + "\n";
                  }
                  if(block['type'] === 'list'){
                    notesText += block['data']['items'].join("\n") + "\n";
                  }


              });
            });
            // If key contains video, canvas or pdf , then we will use the notesText as the title 
            if(key.includes("127.0.0.1:3000/video.html?") || key.includes("127.0.0.1:3000/notes/") || key.includes("127.0.0.1:3000/pdf.html?")){
              title = notesText.slice(0, 120); // Take first 50 characters as title

              let valFoo = JSON.parse(row['value']);
              // Update the title in the value
              valFoo['TITLE'] = title;

              value = JSON.stringify(valFoo);
            }

            let notes = JSON.stringify(cleanedNotes) || "";
            let summary= "";
            let user = "root";
            let css =  JSON.stringify(val['CSS']) || ""; 
            let meta = JSON.stringify(val['META']) || "";
            let sqlTags = `REPLACE INTO MyTable (key, uid, title, tags, notes, notesText, summary, user, css, meta, value) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
            dbClean.run(sqlTags, [key,uid, title, tags, notes, notesText, summary, user, css, meta, value], function(err) {
              if (err) {
                console.error(err.message);
              }
            });
    
    
          }catch(e){
            console.error(e);
            console.log("[PROCESSDB] Error parsing tags for key: "+row['key']);
            console.log("[PROCESSDB] Ignoring this key"); 
          }
        });
      });


  }
}


function addPDFannotations(){
  console.log("[ADDANNOTATIONS] Adding PDF annotations...");
  var files = fs.readdirSync(path.join(__dirname, 'notes', 'docs', 'annots'));
  console.log("[ADDANNOTATIONS] Found " + files.length + " PDF files.");

  files.forEach((file) => {
      if(file.endsWith('.json')){

        console.log("[ADDANNOTATIONS] Processing file: " + file);
        // Read the PDF file
        var annotFile = path.join(__dirname, 'notes', 'docs', 'annots', file);
        fs.readFile(annotFile, "utf8",(err, annotData) => {
          if (err) {
            console.error("[ADDANNOTATIONS] Error reading JSON file: " + err);
            return;
          }
          // parse and construct the notesText
          try{
            let annotDataParsed = JSON.parse(annotData);
          let notesText = "";

          for(let i=0; i<annotDataParsed.length; i++){
            if(annotDataParsed[i]['type'] ==='Highlight'){
              notesText += "<a href='" + "/notes/docs/" + file.replace(".json", ".pdf") + "#page=" + annotDataParsed[i]['page'] + "'>" + "Page-" + annotDataParsed[i]['page']  + " (highlight) </a> <br>";
              notesText += "<blockquote>" + annotDataParsed[i]['text'] + "</blockquote><br>";
              if(annotDataParsed[i]['contents']!== undefined && annotDataParsed[i]['contents'].length > 0){
                notesText += "<ul><li>" + annotDataParsed[i]['contents'] + "</li></ul><br>";
              }

            }
            if(annotDataParsed[i]['type'] === 'Text'  ||  annotDataParsed[i]['type'] === 'freeText' ){
             if(annotDataParsed[i]['contents']!== undefined && annotDataParsed[i]['contents'].length > 0){
                notesText += "<a href='" +  "/notes/docs/" + file.replace(".json", ".pdf") + "#page=" + annotDataParsed[i]['page'] + "'>" + "Page-" + annotDataParsed[i]['page'] + " (note)</a> <br>";
                notesText += "<ul><li>" + annotDataParsed[i]['contents'] + "</li></ul><br>";
              }
            }

          }

          let key = HOSTSERVER + ":" + HOSTPORT + "/notes/docs/" + file;
          key  = key.replace(".json", ".pdf");
          let value = JSON.stringify({
            "TITLE": file.replace(".json", ""),
            "TAGS": "",
            "JSON": {
              "1": {
                "blocks": [
                  {
                    "type": "paragraph",
                    "data": {
                      "text": notesText
                    }
                  }
                ]
              }
            },
            "CSS": {},
            "META": {},
            "URL": key
          });
          let uid = crypto.createHash('md5').update(key).digest('hex');



          let sqlTags = `REPLACE INTO MyTable (key, uid, title, tags, notes, notesText, summary, user, css, meta, value) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
          dbClean.run(sqlTags, [key,uid, file, "", notesText, notesText, "", "root", "", "", value], function(err) {
            if (err) {
              console.error(err.message);
            }
          });
        } catch(e){
            console.error("[ADDANNOTATIONS] Error parsing JSON file: " + e);
            return
          }

        });
      }
  });
}

const ignoredWebsites = {
  email: [
    "mail.google.com", 
    "outlook.live.com", 
    "mail.yahoo.com", 
    "icloud.com/mail", 
    "protonmail.com", 
    "mail.aol.com", 
    "zoho.com/mail"
  ],
  banks: [
    "chase.com", 
    "bankofamerica.com", 
    "wellsfargo.com", 
    "citi.com", 
    "usbank.com", 
    "capitalone.com", 
    "pnc.com", 
    "tdbank.com", 
    "suntrust.com", 
    "bbt.com", 
    "regions.com", 
    "schwab.com", 
    "fidelity.com", 
    "paypal.com", 
    "ally.com", 
    "discover.com", 
    "hsbc.com", 
    "usaa.com"
  ],
  socialMedia: [
    "facebook.com", 
    "twitter.com", 
    "instagram.com", 
    "linkedin.com", 
    "reddit.com", 
    "old.reddit.com",
    "tumblr.com",
    "quora.com",
    "pinterest.com", 
    "snapchat.com", 
    "tiktok.com", 
    "youtube.com", 
    "whatsapp.com", 
    "telegram.org"
  ],
  shopping: [
    "amazon.com", 
    "ebay.com", 
    "walmart.com", 
    "target.com", 
    "bestbuy.com", 
    "costco.com", 
    "homedepot.com", 
    "lowes.com", 
    "macys.com", 
    "kohls.com", 
    "sears.com"
  ],
  searchEngines: [
    "google.com", 
    "bing.com", 
    "yahoo.com", 
    "duckduckgo.com", 
    "ask.com", 
    "aol.com", 
    "yandex.com", 
    "baidu.com"
  ],
  custom:[
    HOSTSERVER + ":" + HOSTPORT // Add the server itself to the ignored list
  ]
};

function isUrlInIgnoredWebsites(url) {
  const urlDomain = url.replace(/https?:\/\//, "").split("/")[0]; // Extract domain from URL
  // Check if the domain is in any of the ignored categories
  for (const category in ignoredWebsites) {
    for (const domain of ignoredWebsites[category]) {
      if (urlDomain.includes(domain)) {
        console.log(`URL ${url} is in the ignored category: ${category}`);
        return true; // URL is in the ignored list
      }
    }
  }
  return false;// URL is not in the ignored list and can be processed
}

let registeredExtensions = [] 
// Load registered users from file
fs.readFile('registeredUsers.json', 'utf8', (err, data) => {
  if (err) {
      console.error('Error reading file:', err);
      return;
  }
  registeredExtensions = JSON.parse(data);
  console.log("[REGISTER] Users registered: ", registeredExtensions);
});




///// Static webpages  //////
app.get('/notesViewer', (req, res) => {
  const url = req.url.replace('/notesViewer?', ''); 
  const urlParams = new URLSearchParams(url);
  if(urlParams.has('q')){
      res.sendFile(__dirname + '/notes.html');
  }
  else if (urlParams.has('pdfs')) {
  // glob pdf files from folder
  const folderPath = path.join(__dirname, 'notes', 'docs');
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
              .pdf-container {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  gap: 40px;
              }
              .pdf-item {
                  width: 300px;
                  text-align: center;
                    overflow-wrap: break-word;
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
          <h1 style="text-align:center">Saved PDFs</h1>
          <div class="pdf-container">
            ${pdfFiles.map(pdfFile => `
              <div class="pdf-item">
                  <h4> <a href="/pdf.html?pdfUrl=${encodeURI(`notes/docs/${pdfFile}`)}" target="_blank">${pdfFile}
                  </a> </h4>
              </div><br>
            `).join('')}
          </div>
      </body>
      </html>
      `;
      res.send(htmlContent);
  }
  );

  }
  else if (urlParams.has('videos'))
  {
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
  }
  else if (urlParams.has('canvas')){
      const uniqueId = Date.now();
      const fileName = `page_${uniqueId}.html`;
      const filePath = path.join('notes','pages', fileName);

      const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>WBJS canvas</title>
          <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
            }
          </style>
      </head>
      <body>
          <div height="100000px" width="100%" id="wbjs-canvas" style="overflow-y:auto;background-color: #f4f4f4;">${"&nbsp;<br>".repeat(10000) }</div>
      </body>
      </html>
      `;
      fs.writeFile(filePath, htmlContent, (err) => {
          if (err) {
              console.error('Error writing file:', err);
              res.status(500).send('Server Error');
              return;
          }
          res.redirect(HOSTSTRING + `/notes/pages/${fileName}`);
      });
  }

});

app.get('/pdf.html', (req, res) => {
  res.sendFile(__dirname + '/pdf.html');
});

app.get('/video.html', (req, res) => {
  res.sendFile(__dirname + '/video.html');
});

app.get('/pingWBJS', (req,res) =>{
  res.json({
    message: "WBJSServer"
  });
});
////////////////////////////


processDB(key="");
addPDFannotations();


app.post('/getAll', (req, res) => {
  //First authenticate user using header token
  let token = req.headers['token'];
  console.log("[GETALLNOTES] called with token: ", token);

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

  let sql = `SELECT key,tags FROM MyTable`;

  dbClean.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    let result = {};
    rows.forEach((row, index) => {
      //Remove whitespaces 
      let tags = row['tags'].replace(/\s/g, '');
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

app.post('/readability', (req, res) => {

  let bodyHTML = req.body.bodyHTML;

  var doc = new JSDOM(bodyHTML);
  let reader = new Readability(doc.window.document);
  let article = reader.parse();
  //Store the article in the database
  let sql = `INSERT INTO MyTable VALUES (?, ?, ?, ?, ?, ?, ?)`;
  if(isUrlInIgnoredWebsites(req.body.url)){

    let val = article;
    dbReadability.run(sql, [req.body.url, bodyHTML, val['content'], val['textContent'], val['excerpt'], val['title'], val['length']], function(err) {
      if (err) {
        if(err.message.includes('UNIQUE constraint failed')){ 
          console.log('[READABILITY] Key already exists. Updating value.');
          let sqlUPDATE = `UPDATE MyTable SET VALUES (?, ?, ?, ?, ?, ?) WHERE key = ?`;
          dbReadability.run(sqlUPDATE, [ bodyHTML,val['content'], val['textContent'], val['excerpt'], val['title'], val['length'], req.body.url], function(err) {
            if (err) {
              console.error(err.message);
            }
          });
        }
      }
    });
  }
  try {
    res.json({textContent: article.textContent, html: article.content});
    
  } catch (error) {
    console.error("Error parsing article: ", error);
    // Handle the error gracefully
    res.json({textContent: ""});

  }
});  

// Endpoint to search data from database

app.post('/search', (req, res) => {
  
  let token = req.headers['token'];
  // console.log(processToken(token)); 
  console.log("[SEARCH] called with token: ", token);
  
  if(processToken(token)){
    let tagFlag = req.body.tag;
    let key     = "";
    if(tagFlag){
      key = "%" + req.body.key + "%";

      let sql = `SELECT key,value,tags FROM MyTable WHERE tags LIKE ?`;

      dbClean.all(sql, [key], (err, rows) => {
        if (err) {
          throw err;
        }

        let result = {};
        rows.forEach((row, index) => {
          result[row['key']] = row['value'];
        });

        res.json(result);
      });

    }
    else{
      key = "%" + req.body.key + "%";

      let sql = `SELECT key,value,notesText FROM MyTable WHERE notesText LIKE ? OR key LIKE ? OR title LIKE ?`;

      dbClean.all(sql, [key,key,key], (err, rows) => {
        if (err) {
          throw err;
        }

        let result = {};
        rows.forEach((row, index) => {
          result[row['key']] = row['value'];
        });

        res.json(result);
      });
    }
  }
});


//End point for EDJS search
app.get('/searchWBJS', (req, res) => {
  // const searchString = req.query.search
  var url = req.url;
  url = url.replace('/searchWBJS?', ''); 
  urlSplit = url.split('?search=');
  const searchString = urlSplit[1];
  const urlParams = new URLSearchParams(urlSplit[0]);
  var token = urlParams.get('token');
  token= token.replace('?search=' + searchString, '');

  if(processToken(token)){
    let key = "%" + searchString + " %";
    // console.log("user from WBJS asked to search for : "+key);

    let sql = `SELECT key,title,tags,notesText FROM MyTable WHERE notesText LIKE ? OR key LIKE ? OR title LIKE ?`;

      dbClean.all(sql, [key, key, key], (err, rows) => {
        if (err) {
          throw err;
        }

        let itemsPacked = [];
        rows.forEach((row, index) => {

          try{
            let resultFoo = {};
            resultFoo["href"] = HOSTSTRING + "/notesViewer?q=" + row['key'];
            resultFoo["name"] = row['title'];
            resultFoo["description"] = row['tags']
            resultFoo["notesText"] = row['notesText'];
            resultFoo["key"] = row['key'];

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
    }
});


// Endpoint to get data from database
app.post('/getData', (req, res) => {
  let token = req.headers['token'];
  // console.log(processToken(token)); 
  console.log("[GETDATA] called with token: ", token);
  
  if(processToken(token)){

    let key = req.body.key;
    // search key in database
    let sql = `SELECT value FROM MyTable WHERE key = ?`;
    dbClean.get(sql, [key], (err, row) => {
        if (err) {
            throw err;
        }
        // console.log("data found");
        // console.log(row['value']);
        res.json(row);
        
        });
  }
});

// Endpoint to add data to database
app.post('/data', (req, res) => {

  let token = req.headers['token'];
  console.log("[SAVEDATA] called with token: ", token);

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
              console.log('[SAVEDATA] Key already exists. Updating value.');
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




// Start server -- HTTP
app.listen(HOSTPORT,HOSTSERVER, () => {
  console.log('Server is running on port' + HOSTPORT);
});


// Base HTTPS implementation -- CHeckout - https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener
// const options = {
//   key: fs.readFileSync('private-key.pem'),
//   cert: fs.readFileSync('certificate.pem'),
// };
// https.createServer(app).listen(HOSTPORT, HOSTSERVER, () => {
//   console.log('Server is running on https://' + HOSTSERVER + ':' + HOSTPORT);
//   console.log('To access the notes viewer, go to: https://' + HOSTSERVER + ':' + HOSTPORT + '/notesViewer');
// });

// https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.end('hello world\n');
// }).listen(HOSTPORT);