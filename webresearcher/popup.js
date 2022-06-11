document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('link');
    var newnote = document.getElementById('newnote');
    var refreshIframe= document.getElementById('refreshIframe');

    var iframeElement = document.getElementById('browser');
    var url = document.getElementById('urlInput');
    // onClick's logic below:
    link.addEventListener('click', function() {
      iframeElement.src=url.value;
    });
    newnote.addEventListener('click', function() {
      iframeElement.src=currentTab;
    });
    refreshIframe.addEventListener('click', function() {
      document.getElementById('iframeDiv').innerHTML = `<iframe id="browser" src="`+ currentTab +`"style="position: absolute; height: 88%; width:100%;"> ></iframe>`;
    });
});

var currentTab = '';
var urlExceptions = ['https://mail.google.com/mail/u/0/','https://web.whatsapp.com/'];

function handleUpdated(tabId, changeInfo, tabInfo) {
  // currentTab = "http://0.0.0.0:8001/tiddlyroam3.html#"+tabInfo.url.replace(/(^\w+:|^)\/\//, '');
  if(!(tabInfo.url in urlExceptions)){
    currentTab = "http://0.0.0.0:8001/tiddlyroam3.html#"+"#:[search["+tabInfo.url+"]]";

    var link = document.getElementById('link');
    var iframeElement = document.getElementById('browser');
    iframeElement.src="http://0.0.0.0:8001/tiddlyroam3.html"+"#:[search["+tabInfo.url+"]]";
    var url = document.getElementById('urlInput');
    url.value ="http://0.0.0.0:8001/tiddlyroam3.html"+"#:[search["+tabInfo.url+"]]";



  }

}

browser.tabs.onUpdated.addListener(handleUpdated);
