document.addEventListener('DOMContentLoaded', function() {
    // When user hits the search button in the sidebar, perform search //
    // Due to security restrictions on what can be accessed, this may not work on all urls //

    var link            = document.getElementById('link');
    var iframeElement   = document.getElementById('browser');
    var url             = document.getElementById('urlInput');

    // onClick's logic below:
    link.addEventListener('click', function() {
      iframeElement.src = url.value;
    });    

});

var currentTab = '';
var urlExceptions = ['mail.google.com','web.whatsapp.com', 'open.spotify.com'];

function handleTabChanges(tabId, changeInfo, tabInfo) {

  var tabTriggered = tabInfo.url;

  var urlExceptionsStatus = false; 
  urlExceptions.forEach((fooURL)=>{
    if(tabTriggered.includes(fooURL)){
      // If the current url is in the listof urls which are banned then return back to main.
      urlExceptionsStatus = true;
      return false;
    }
  });

  if(urlExceptionsStatus){
    return false;
  }

  var gettingItem = browser.storage.sync.get('TWFilepath');
  gettingItem.then((res) => {
    
    currentTab          = JSON.parse(res.TWFilepath)+"#:[search["+tabTriggered+"]]";

    var iframeElement   = document.getElementById('browser');
    var url             = document.getElementById('urlInput');

    // Firefox has some issues loading in iframes - https://stackoverflow.com/questions/86428/what-s-the-best-way-to-reload-refresh-an-iframe
    
    iframeElement.src   = JSON.parse(res.TWFilepath)+"#:[search["+tabTriggered+"]]" + '';
    url.value           = JSON.parse(res.TWFilepath)+"#:[search["+tabTriggered+"]]";

  });

}
// when user changes tab, update Tiddlywiki notes page.
browser.tabs.onUpdated.addListener(handleTabChanges);
browser.tabs.onActivated.addListener(handleTabChanges);
browser.tabs.onCreated.addListener(handleTabChanges);
