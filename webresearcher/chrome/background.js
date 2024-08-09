
function handleClick() {
  chrome.tabs.create({url: 'options.html'});
}

chrome.action.onClicked.addListener(handleClick);



chrome.contextMenus.create({
  id: "eat-page",
  title: "Start WebResearcherJS",
  contexts: ["all"]
});



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
  "webresearcher/export.js",
  "webresearcher/storage.js",
  "webresearcher/webresearcher.js",
];

var cssFiles = [
  "ext_libs/jquery-ui.min.css",
  "webresearcher/custom.css"
];

function onExecuted(result) {
  console.log(`Loaded`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

async function loadJQuery(tab) {
  await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: [jsFiles[0]]
  });
  loadJQueryUI(tab);
}

async function loadJQueryUI(tab) {
  await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: [jsFiles[1]]
  });
  loadEditor(tab);
}

async function loadEditor(tab) {
  await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: [jsFiles[2]]
  });
  loadOtherModules(tab);
}



async function loadOtherModules(tab) {
  for(let i=0; i<cssFiles.length; i++){
    await chrome.scripting.insertCSS({
      target: {tabId: tab.id},
      files: [cssFiles[i]]
    });
  }
  for(let i=4; i<jsFiles.length; i++){
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: [jsFiles[i]]
    });
  }
}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse({response: "starting WBJS"});
    loadJQuery(sender.tab);
  }
);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "eat-page") {
    loadJQuery(tab);
  }
});
