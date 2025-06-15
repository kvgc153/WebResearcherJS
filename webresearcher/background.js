let myAddonId = browser.runtime.getURL("");
let jsFiles = [
  "ext_libs/jquery.min.js",
  "ext_libs/jquery-ui.min.js",
  "ext_libs/editorjs@latest.js",
  "ext_libs/header@latest.js",
  "ext_libs/simple-image@latest.js",
  "ext_libs/list@latest.js",
  "ext_libs/code@latest.js",
  "ext_libs/quote@latest.js",
  "ext_libs/embed@latest.js", 
  "ext_libs/popper.js",
  "ext_libs/notify.min.js",
  "ext_libs/link-autocomplete.js",
  "ext_libs/attaches@latest.js",
  "webresearcher/init.js",
  "ext_libs/editorjs-ask.js",
  "webresearcher/handleMouseEvents.js",
  "webresearcher/export.js",
  "webresearcher/storage.js",
  "webresearcher/webresearcher.js", 
  "webresearcher/tooltip.js",
];
let cssFiles = [
  "ext_libs/jquery-ui.min.css",
  "webresearcher/custom.css"
];

// error catching functions
function onExecuted(result) {
  console.log(`Loaded`);
}
function onError(error) {
  console.log(`Error: ${error}`);
}

function reloadTabs(tabs) {
  for (const tab of tabs) {
    console.log("Reloading " + tab.id);
    browser.tabs.reload(tab.id);
  }
}

// first wait for jquery, jquery-ui and others to load and then load all the small ones.. very poorly written code...
function loadJQuery(tabID,tabURL){
  const executing = browser.tabs.executeScript(tabID,{
    file: jsFiles[0]
  });
  executing.then(loadJQueryUI(tabID,tabURL), onError);
}

function loadJQueryUI(tabID,tabURL){
  const executing =  browser.tabs.executeScript(tabID,{
    file: jsFiles[1]
  });
  executing.then(loadEditor(tabID,tabURL), onError);
}

function loadEditor(tabID,tabURL){
  const executing =  browser.tabs.executeScript(tabID,{
    file: jsFiles[2]

  });
  executing.then(loadOtherModules(tabID,tabURL), onError);
}

// load all other modules
function loadOtherModules(tabID,tabURL){
  for(var i=0;i<cssFiles.length;i++){
          const executing = browser.tabs.insertCSS(tabID,{
            file: cssFiles[i],

          });
          executing.then(onExecuted, onError);
  }
  for(var i=3;i<jsFiles.length;i++){
          const executing =  browser.tabs.executeScript(tabID,{
          file: jsFiles[i],

        });
        executing.then(onExecuted, onError);
    }
  
  // Load the notesViewer javascript file if the URL matches
  if(tabURL.includes(serverHost + "/notesViewer")){
    console.log("Loading notes viewer");
    browser.tabs.executeScript(tabID, {
      file: "webresearcher/notesViewer.js"
    }).then(onExecuted, onError);
  }
}

// Server variables
let portNumber = 0;
var serverHost  = "";
var authServer = "";
var fetchServer = "";
var searchServer = "";
var postServer  = "";
var tagsServer  = "";
var readabilityServer  = "";

async function getPortNumber() {
  for(let port= 3000; port<3050; port++){
    try {
      const response = await fetch(`http://127.0.0.1:${port}/pingWBJS`);
      if (response.ok) {
        console.log(`Server is running on port ${port}`);
        return port; // Return the first available port
      }
    } catch (error) {
      console.error(`Error connecting to port ${port}: ${error}`);
    }
  }
}
getPortNumber().then((port) => {
  portNumber = port;
  serverHost  = "http://127.0.0.1:" + portNumber;
  authServer = serverHost + "/authWBJS";
  fetchServer = serverHost + "/getData";
  searchServer = serverHost + "/search";
  postServer  = serverHost + `/data`;
  tagsServer  = serverHost + `/getAllTags`;
  readabilityServer  = serverHost + `/readability`;

  console.log("Server Host: " + serverHost);
});


function handleMessage(request, sender, sendResponse) {

  switch(request.greeting) {
    case "trigger":
      console.log("Message from the content script: " + request.greeting);
      console.log(sender.tab.id);
      loadJQuery(sender.tab.id, sender.tab.url);
      sendResponse({response: "Response from background script"});

    case "fetch":
      console.log("Fetching data from server");
      return fetch(fetchServer, {
        body: request.data, 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": myAddonId
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return({ 
            response: data.value 
          }); 
        })


    case "search":
      console.log("Searching for data from server");
      return fetch(searchServer, {
        body: request.data, 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": myAddonId
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return({ 
            response: JSON.stringify(data) 
          }); 
        })

    case "getAllTags":
      // [TODO] Clean this up and update init.js to use this
      console.log("Fetching tags from server");
      return fetch(tagsServer, {
        body: request.data, 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": myAddonId
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return({ 
            response: JSON.stringify(data),
            token: myAddonId
          }); 
        })

    case "save":
      console.log("Saving data to server");
      return  fetch(postServer,
      {
          body: JSON.stringify(request.data),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": myAddonId
          },          
      }
      )
      .then(()=>{
        // Reload the tabs with the current URL
        browser.tabs.query({ url: sender.tab.url })
        .then(reloadTabs, onError);
      })
      .then(()=>{
        return({
          response: "saved"
        })
      }).catch((error)=>{
        return({
          response: "error"
        })
      });

    case "readability":
      return fetch(readabilityServer, {
        body: request.data, 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": myAddonId
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return({ 
            response: data
          }); 
        })
  }
}
// Trigger loading of modules //
browser.runtime.onMessage.addListener(handleMessage);

////////////////////////////////////////////////////////////

// browser.runtime.onInstalled.addListener(function() {
//   // Register firefox extension with the server
//   fetch(registerServer, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "token": myAddonId
//     }),
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Registered with server");
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


// });


// function handleClick() {
//   browser.runtime.openOptionsPage();
// }

// browser.browserAction.onClicked.addListener(handleClick);
// console.log("inside background.js");
