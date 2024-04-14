// export Notes to Joplin using API
document.getElementById('exportNotesJSON').addEventListener('click', ()=>{

  console.log("User asked to export notes to Joplin.");
  // console.log( exportHTML.join(''));

  // pack results into a dictionary
  let foo_final ={};
  foo_final['URL'] = webPageUrl;
  foo_final['TITLE'] = pageTitle;
  foo_final['HTML'] = WBJS_HTML;
  foo_final['JSON'] = WBJS_JSON;
  foo_final['CSS']  = WBJS_CSS;
  foo_final['TAGS'] = document.getElementById('tagsWBJS').value || '';

  var saveTitle = window.location.href.replace(/(^\w+:|^)\/\//, '').replaceAll(".","_");
  saveTitle = saveTitle.split("#")[0];

  var fileName = saveTitle  + ".json";
  var htmlContent = [JSON.stringify(foo_final)];
  var bl = new Blob(htmlContent, {type: "application/json"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(bl);
  a.download = fileName;
  a.hidden = true;
  document.body.appendChild(a);
  a.click();

});