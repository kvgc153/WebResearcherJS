
function saveOptions(e) {
  chrome.storage.sync.set({
    joplinToken: JSON.stringify(document.querySelector("#joplinToken").value)
  });
  e.preventDefault();
}

function restoreOptions() {
  // var gettingItem = chrome.storage.sync.get('TWFilepath');
  // gettingItem.then((res) => {
  //   document.querySelector("#TWFilepath").value = JSON.parse(res.TWFilepath) || 'Firefox red';
  // });

  // var gettingItem1 = chrome.storage.sync.get('MarkJSHighlight');
  // gettingItem1.then((res) => {
  //   document.querySelector("#MarkJSHighlight").value = JSON.parse(res.MarkJSHighlight) || 'Firefox red';
  // });

  var gettingItem2 = chrome.storage.sync.get('joplinToken');
  gettingItem2.then((res) => {
    document.querySelector("#joplinToken").value = JSON.parse(res.joplinToken) || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
