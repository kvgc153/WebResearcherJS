/// save Notes to localStorage when user clicks "save notes button"
document.getElementById('saveNotesWBJS').addEventListener('click', saveAllNotesWBJS);
function saveAllNotesWBJS(){
  let foo_final ={}
  foo_final['HTML'] = WBJS_HTML
  foo_final['JSON'] = WBJS_JSON
  foo_final['CSS']  = WBJS_CSS
  console.log("user asked to save data")
  console.log(foo_final);
  localStorage.setItem(webPageUrl,JSON.stringify(foo_final));

  $.notify('Added notes to local storage', "success");

}
