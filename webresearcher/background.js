browser.contextMenus.create({
  id: "eat-page",
  title: "Start WebResearcherJS"
});


////////////////////////////////////////////////////////////
var jsFiles = ["ext_libs/jquery.min.js",
"ext_libs/jquery-ui.min.js",
"ext_libs/popper.js",
"ext_libs/pell.min.js",
"ext_libs/notify.min.js",
"ext_libs/bootstrap.min.js",
"ext_libs/tex-chtml.js",
"ext_libs/katex.min.js",
"ext_libs/auto-render.min.js",
"webresearcher/init.js",
"webresearcher/webresearcher.js",
"webresearcher/sidebar.js",
"webresearcher/export.js"
];

var cssFiles = ["ext_libs/pell.css",
"ext_libs/jquery-ui.min.css",
"ext_libs/bootstrap.min.css",
"ext_libs/katex.min.css"];

// error catching functions
function onExecuted(result) {
  console.log(`Loaded`);
}

function onError(error) {
  // alert(error);
  console.log(`Error: ${error}`);
}

// first wait for jquery and jquery-ui to load
function loadJQuery(){
    const executing = browser.tabs.executeScript({
    file: jsFiles[0]
    });
    executing.then(loadJQueryUI, onError);
}

function loadJQueryUI(){
    const executing = browser.tabs.executeScript({
    file: jsFiles[1]
    });
    executing.then(loadOtherModules, onError);

}
// load all other modules
function loadOtherModules(){

        for(var i=0;i<cssFiles.length;i++){
               const executing = browser.tabs.insertCSS({
                 file: cssFiles[i]
               });
               executing.then(onExecuted, onError);
          }
        for(var i=2;i<jsFiles.length;i++){
            		const executing = browser.tabs.executeScript({
            		file: jsFiles[i]
              });
              executing.then(onExecuted, onError);

         }

}
////////////////////////////////////////////////////////////


browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "eat-page") {
      loadJQuery();
  }
});
