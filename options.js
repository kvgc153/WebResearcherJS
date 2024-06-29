async function saveOptions(e) {
  await chrome.storage.sync.set({
    joplinToken: JSON.stringify(document.querySelector("#joplinToken").value)
  });
  e.preventDefault();
}

async function restoreOptions() {
  function getJoplinToken() {
    return chrome.storage.sync.get('joplinToken').then((x) => {
      let foo_res = JSON.parse(x.joplinToken);
      return foo_res;
    });
  }
  getJoplinToken().then((token) => {
    joplinToken = token;
    document.querySelector("#joplinToken").value = joplinToken || 'Firefox red';

  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
