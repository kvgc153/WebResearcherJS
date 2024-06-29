console.log("inside background.js");

var joplinToken = '';


chrome.contextMenus.create({
  id: "eat-page",
  title: "Start WebResearcherJS",
  contexts: ["all"]
});

function handleClick() {
  chrome.tabs.create({url: 'options.html'});
}

chrome.action.onClicked.addListener(handleClick);



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
  loadJoplinToken(tab);
}

async function loadJoplinToken(tab) {
  // let {joplinToken} = await chrome.storage.sync.get('joplinToken');
  // let foo_res = JSON.parse(joplinToken);
  // var joplinToken = foo_res;
  // console.log(foo_res);
  
  // Define a function that sets the joplinToken variable
  function setJoplinToken() {
    // var joplinToken = foo_res;
    // o nothing 
  }

  // Execute the function
  await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: setJoplinToken
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

// chrome.runtime.onMessage.addListener(async (request, sender) => {


//   console.log("Message from the content script: " + request.greeting);
//   console.log(joplinToken);
  
//   loadJQuery(sender.tab);

//   // Return a Promise that resolves to the response
//   return {response: joplinToken};
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    function getJoplinToken() {
      return chrome.storage.sync.get('joplinToken').then((x) => {
        console.log(x);
        let foo_res = JSON.parse(x.joplinToken);
        return foo_res;
      });
    }
    getJoplinToken().then((token) => {
      joplinToken = token;
      console.log(joplinToken);
    });
    sendResponse({response: joplinToken});
    loadJQuery(sender.tab);
  }
);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "eat-page") {
    loadJQuery(tab);
  }
});
