
function handleClick() {
  chrome.runtime.openOptionsPage();
}


chrome.browserAction.onClicked.addListener(handleClick);

console.log("inside background.js");
chrome.contextMenus.create({
  id: "eat-page",
  title: "Start WebResearcherJS"
});

/////////////////////////////////////
//// Load all modules to webpage ////
/////////////////////////////////////
var jsFiles = [
  "ext_libs/jquery.min.js",
  "ext_libs/jquery-ui.min.js",
  "ext_libs/editorjs@latest.js",
  "ext_libs/mark.min.js",
  "ext_libs/header@latest.js",
  "ext_libs/simple-image@latest.js",
  "ext_libs/list@latest.js",
  "ext_libs/code@latest.js",
  "ext_libs/quote@latest.js",
  "ext_libs/edjsHTML.js",
  "ext_libs/popper.js",
  "ext_libs/notify.min.js",
  "ext_libs/jquery.sidebar.min.js",
  "webresearcher/init.js",
  "webresearcher/handleMouseEvents.js",
  "webresearcher/loadLocalStorage.js",
  "webresearcher/saveLocalStorage.js",
  "webresearcher/export.js",
  "webresearcher/webresearcher.js"
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
function loadJQuery(){
  chrome.tabs.executeScript({
    file: jsFiles[0]
  }, loadJQueryUI);
}

function loadJQueryUI(){
  chrome.tabs.executeScript({
    file: jsFiles[1]
  }, loadEditor);
}

function loadEditor(){
  chrome.tabs.executeScript({
    file: jsFiles[2]
  }, loadJoplinToken);
}

function loadJoplinToken(){
  chrome.storage.sync.get('joplinToken', function(res) {
    var foo_res = JSON.parse(res.joplinToken);
    console.log(foo_res);
    chrome.tabs.executeScript({
        code:`var joplinToken="`+ foo_res + `";`
    }, loadOtherModules);
  });
}

function loadOtherModules(){
  for(var i=0;i<cssFiles.length;i++){
    chrome.tabs.insertCSS({
      file: cssFiles[i]
    }, onExecuted);
  }
  for(var i=4;i<jsFiles.length;i++){
    chrome.tabs.executeScript({
      file: jsFiles[i]
    }, onExecuted);
  }
}

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " + request.greeting);
  loadJQuery();
  sendResponse({response: "Response from background script"});
}

chrome.runtime.onMessage.addListener(handleMessage);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "eat-page") {
    loadJQuery();
  }
});