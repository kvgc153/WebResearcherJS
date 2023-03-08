/// save Notes to localStorage when user clicks "save notes button" ///
function saveAllNotesWBJS(){
  // pack results into a dictionary
  let foo_final ={}
  foo_final['HTML'] = WBJS_HTML
  foo_final['JSON'] = WBJS_JSON
  foo_final['CSS']  = WBJS_CSS

  console.info("user asked to save data. Packed data below:")
  console.log(foo_final);

  localStorage.setItem(webPageUrl, JSON.stringify(foo_final));

  // Saves a copy of the urls in which notes were taken in WBJS_URLS
  // One can then use these as keys to access the notes in their localstorage
  if(localStorage.getItem('WBJS_KEYS') == null ){
    let dbUrls = [];
    console.info("WBJS_KEYS not found in localstorage. Creating new entry.")
    dbUrls.push(webPageUrl);
    localStorage.setItem('WBJS_KEYS', JSON.stringify(dbUrls));
  }
  else {
    let dbUrls = JSON.parse(localStorage.getItem('WBJS_KEYS'));
    dbUrls.push(webPageUrl);
    localStorage.setItem('WBJS_KEYS', JSON.stringify(dbUrls));
  }

  $.notify('Added notes to local storage', "success");
}
document.getElementById('saveNotesWBJS').addEventListener('click', saveAllNotesWBJS);
