
function saveOptions(e) {
  browser.storage.sync.set({
    TWFilepath: JSON.stringify(document.querySelector("#TWFilepath").value),
    MarkJSHighlight: JSON.stringify(document.querySelector("#MarkJSHighlight").value)
  });
  e.preventDefault();
}

function restoreOptions() {
  var gettingItem = browser.storage.sync.get('TWFilepath');
  gettingItem.then((res) => {
    document.querySelector("#TWFilepath").value = JSON.parse(res.TWFilepath) || 'Firefox red';
  });

  var gettingItem1 = browser.storage.sync.get('MarkJSHighlight');
  gettingItem1.then((res) => {
    document.querySelector("#MarkJSHighlight").value = JSON.parse(res.MarkJSHighlight) || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
