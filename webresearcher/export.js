// export Notes to Joplin using API
document.getElementById('exportNotesJoplin').addEventListener('click', ()=>{

  var exportHTML=[];
  exportHTML[0]= "<table><tr><td>URL</td><td>Title</td></tr><tr><td>" + url_window +"</td> <td>" + pageTitle + "</td> </tr></table>";

  for(foo_exp=1; foo_exp<note_count; foo_exp++){
    exportHTML[foo_exp] = "<h3>Note:"+foo_exp+"</h3>"+WBJS_HTML[foo_exp]+"<hr><br>";
  }

  console.log("User asked to export notes to Joplin.");
  console.log( exportHTML.join(''));
  fetch("http://localhost:41184/notes?token=" + joplinToken,
      {
          body: JSON.stringify({ 
            "title": document.title , 
            "body_html": exportHTML.join(''), 
            "tags" : "WBJS"
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },          
      }
  );
  $.notify('Adding notes to Joplin', "success");

});