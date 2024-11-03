// function handleClick() {
//   browser.runtime.openOptionsPage();
// }

// browser.browserAction.onClicked.addListener(handleClick);

console.log("inside background.js");
// browser.contextMenus.create({
//   id: "eat-page",
//   title: "Start WebResearcherJS"
// });

/////////////////////////////////////
//// Load all modules to webpage ////
/////////////////////////////////////
var jsFiles = [
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

var cssFiles = [
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

// first wait for jquery, jquery-ui and others to load and then load all the small ones.. very poorly written code...
function loadJQuery(tabID){
  const executing = browser.tabs.executeScript(tabID,{
    file: jsFiles[0]
  });
  executing.then(loadJQueryUI(tabID), onError);
}

function loadJQueryUI(tabID){
  const executing =  browser.tabs.executeScript(tabID,{
    file: jsFiles[1]
  });
  executing.then(loadEditor(tabID), onError);
}

function loadEditor(tabID){
  const executing =  browser.tabs.executeScript(tabID,{
    file: jsFiles[2]

  });
  executing.then(loadOtherModules(tabID), onError);
}



// load all other modules
function loadOtherModules(tabID){
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

}

// Server variables
var serverHost  = "http://127.0.0.1:3000";
// var serverHost  = "http://webresearcher.xyz:3000";

var fetchServer = serverHost + "/getData";
var postServer  = serverHost + `/data`;

function handleMessage(request, sender, sendResponse) {
  if(request.greeting == "trigger"){
    console.log("Message from the content script: " + request.greeting);
    console.log(sender.tab.id);
    // make a log of the id and url of the tab
    loadJQuery(sender.tab.id);
    sendResponse({response: "Response from background script"});
  }

  else if (request.greeting == "fetch"){
    console.log("Fetching data from server");
    return fetch(fetchServer, {
      body: request.data, 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return({ 
          response: data.value 
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
        },          
    }
    ).then(()=>{
      return({
        response: "saved"
      })
    }).catch((error)=>{
      return({
        response: "error"
      })
    });
     
  }
}
// Trigger loading of modules //
browser.runtime.onMessage.addListener(handleMessage);

////////////////////////////////////////////////////////////



// browser.contextMenus.onClicked.addListener(function(info, tab) {
//   if (info.menuItemId == "eat-page") {
//       loadJQuery();
//   }
// });
