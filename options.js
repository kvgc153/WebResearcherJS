
function saveOptions(e) {
  browser.storage.sync.set({
    TWFilepath: JSON.stringify(document.querySelector("#TWFilepath").value)
  });
  e.preventDefault();
}

function restoreOptions() {
  var gettingItem = browser.storage.sync.get('TWFilepath');
  gettingItem.then((res) => {
    document.querySelector("#TWFilepath").value = JSON.parse(res.TWFilepath) || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
