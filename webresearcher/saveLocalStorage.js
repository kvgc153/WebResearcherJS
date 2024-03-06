/// save Notes to localStorage when user clicks "save notes button" ///
function saveAllNotesWBJS(){
  // pack results into a dictionary
  let foo_final ={}
  foo_final['HTML'] = WBJS_HTML;
  foo_final['JSON'] = WBJS_JSON;
  foo_final['CSS']  = WBJS_CSS;
  foo_final['TAGS'] = document.getElementById('tagsWBJS').value;

  console.info("user asked to save data. Packed data below:")
  console.log(foo_final);

  localStorage.setItem(webPageUrl, JSON.stringify(foo_final));
  $.notify('Added notes to local storage', "success");
}
document.getElementById('saveNotesWBJS').addEventListener('click', saveAllNotesWBJS);
