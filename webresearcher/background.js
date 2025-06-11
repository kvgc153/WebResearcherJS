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
  "ext_libs/editorjs-ask.js",
  "ext_libs/attaches@latest.js",
  "webresearcher/init.js",
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
  // alert(error);
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
// var serverHost  = "http://webresearcher.xyz:3000";
let serverHost  = "http://127.0.0.1:3000";
let fetchServer = serverHost + "/getData";
let searchServer = serverHost + "/search";
let postServer  = serverHost + `/data`;
let readabilityServer  = serverHost + `/readability`;
// var registerServer = serverHost + `/register`;  



function handleMessage(request, sender, sendResponse) {
  if(request.greeting == "trigger"){
    console.log("Message from the content script: " + request.greeting);
    console.log(sender.tab.id);
    loadJQuery(sender.tab.id, sender.tab.url);
    sendResponse({response: "Response from background script"});
  }

  else if (request.greeting == "fetch"){
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

  }


  else if (request.greeting == "search"){
    console.log("Fetching data from server");
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

  }
  else if (request.greeting == "save"){
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
  }

  else if (request.greeting == "readability"){
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
