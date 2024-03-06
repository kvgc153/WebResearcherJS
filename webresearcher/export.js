// export Notes to Joplin using API
document.getElementById('exportNotesJoplin').addEventListener('click', ()=>{

  var exportHTML=[];
  exportHTML[0]= "<table><tr><td>URL</td><td>Title</td></tr><tr><td>" + url_window +"</td> <td>" + pageTitle + "</td> </tr></table>";

  for(foo_exp=1; foo_exp<note_count; foo_exp++){
    fooDoc = document.createElement("a");
    fooDoc.href = url_window + "#tooltip" + foo_exp;
    fooDoc.innerText = "(EDIT)";
    exportHTML[foo_exp] = "<h3>Note"+foo_exp+ fooDoc.outerHTML +":</h3>"+WBJS_HTML[foo_exp]+"<hr><br>";
  }

  console.log("User asked to export notes to Joplin.");
  // console.log( exportHTML.join(''));

  async function fetchJson(url) {
    var results = await fetch(url);
    var resultsJSON = await results.json();
    if(resultsJSON.items.length == 0){
      // pack results into a dictionary
      let foo_final ={};
      foo_final['HTML'] = WBJS_HTML;
      foo_final['JSON'] = WBJS_JSON;
      foo_final['CSS']  = WBJS_CSS;
      foo_final['TAGS'] = document.getElementById('tagsWBJS').value;
      let metaDataBlock = `<div id="metadata_wbjs" style="display:none;">` + JSON.stringify(foo_final) + `</div>`;

      // create note in Joplin
      fetch("http://localhost:41184/notes?token=" + joplinToken,
      {
          body: JSON.stringify({ 
            "title": document.title , 
            "body": exportHTML.join('') + metaDataBlock, 
            "tags" : "WBJS, " + document.getElementById('tagsWBJS').value,
            "source_url": url_window,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },          
      }
      );
      $.notify('Adding notes to Joplin', "success");
    }

    if(resultsJSON.items.length == 1){
      // pack results into a dictionary
      let foo_final ={};
      foo_final['HTML'] = WBJS_HTML;
      foo_final['JSON'] = WBJS_JSON;
      foo_final['CSS']  = WBJS_CSS;
      foo_final['TAGS'] = document.getElementById('tagsWBJS').value;

      let metaDataBlock = `<div id="metadata_wbjs" style="display:none;">` + JSON.stringify(foo_final) + `</div>`;

      $.notify('Overwriting existing note', "info");
      fetch("http://localhost:41184/notes/"+resultsJSON.items[0].id+"?token=" + joplinToken,
      {
          body: JSON.stringify({ 
            "body": exportHTML.join('') + metaDataBlock, 
            "tags" : "WBJS, " + document.getElementById('tagsWBJS').value,
          }),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },          
      }
      );
      $.notify('Adding notes to Joplin', "success");      

   }
    if(resultsJSON.items.length>1){
      $.notify('Error: Multiple notes with same title found. Cannot save to Joplin. Delete and retry.', "error");
    }

    }
  // Check if a note already exists
  // If yes, then use the exisiting note ID
  // If no, then create a new note

  fetchJson("http://localhost:41184/search?token=" + joplinToken + "&query=" + pageTitle);

});