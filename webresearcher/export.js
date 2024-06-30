  // export Notes to Joplin using API


async function exportJoplinNotes(notify=false){
  if(note_count>1){
    // save all the notes created so far
    for(i=1;i<note_count;i++){
        // console.log("tooltip"+i);
        let notestyleEl = document.getElementById("tooltip"+i).style;
        let notestyleProps = {
          "height"          :notestyleEl.height,
          "width"           :notestyleEl.width,
          "border"          :notestyleEl.border,
          "color"           :notestyleEl.color,
          "padding"         :notestyleEl.padding,
          "textDecoration"  :notestyleEl.textDecoration,
          "display"         :notestyleEl.display,
          "overflow"        :notestyleEl.overflow,
          "resize"          :notestyleEl.resize ,
          "backgroundColor" :notestyleEl.backgroundColor,
          "fontSize"        :notestyleEl.fontSize,
          "opacity"         :notestyleEl.opacity,
          "position"        :notestyleEl.position,
          "inset"           :notestyleEl.inset,
          "margin"          :notestyleEl.margin,
          "transform"       :notestyleEl.transform
        }

        await editorJSObjs[i].save()
        .then((savedData) =>{
            // Convert JSON to html using parser
            const edjsParser    = edjsHTML();
            let html            = edjsParser.parse(savedData);

            // Save the JSON, CSS
            WBJS_JSON[i]    = savedData;
            WBJS_CSS[i]     = notestyleProps;
            WBJS_HTML[i]    = html.join('');

        }).catch((error) =>{
            console.log(error);
        })
    }

    var exportHTML = [];
    var oImg = document.createElement("a");
    oImg.setAttribute('href', url_window);
    oImg.innerHTML = url_window;
    
    exportHTML[0] = `<h1>WBJS notes</h1>
      <table>
        <tr>
          <td>URL</td>
          <td>Title</td>
        </tr>
        <tr>
          <td>${oImg.outerHTML}</td>
          <td>${pageTitle}</td>
        </tr>
      </table>`;
    
    for(let foo_exp = 1; foo_exp < note_count; foo_exp++){
      let fooDoc = document.createElement("a");
      fooDoc.href = `${url_window}#tooltip${foo_exp}`;
      fooDoc.innerText = "(EDIT)";
    
      exportHTML[foo_exp] = `<h3>Note ${foo_exp} ${fooDoc.outerHTML}:</h3>
        ${WBJS_HTML[foo_exp]}
        <hr>
        <br>`;
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

        // Encode the string to binary data using TextEncoder

        let encodedString = btoa(JSON.stringify(foo_final));
        let metaDataBlock = `<div id="metadata_wbjs" style="display:none;">` + encodedString + `</div>`;

        // create note in Joplin
        fetch(`http://localhost:${joplinPort}/notes?token=` + joplinToken,
        {
            body: JSON.stringify({ 
              "title": pageTitle , 
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
        if(notify==true){
          $.notify('Adding notes to Joplin', "success");
        }
        
      }

      if(resultsJSON.items.length == 1){
        // pack results into a dictionary
        let foo_final ={};
        foo_final['HTML'] = WBJS_HTML;
        foo_final['JSON'] = WBJS_JSON;
        foo_final['CSS']  = WBJS_CSS;
        foo_final['TAGS'] = document.getElementById('tagsWBJS').value;
      // Encode the string to binary data using TextEncoder

      let encodedString = btoa(JSON.stringify(foo_final));
      let metaDataBlock = `<div id="metadata_wbjs" style="display:none;">` + encodedString + `</div>`;
        if(notify==true){
          $.notify('Overwriting existing note', "info");
        }
        fetch(`http://localhost:${joplinPort}/notes/`+resultsJSON.items[0].id+"?token=" + joplinToken,
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
        if(notify==true){
        $.notify('Adding notes to Joplin', "success");     
        } 

    }
      if(resultsJSON.items.length>1){
        if(notify==true){
          $.notify('Error: Multiple notes with same title found. Cannot save to Joplin. Delete and retry.', "error");
        }
      
      }

      }
    // Check if a note already exists
    // If yes, then use the exisiting note ID
    // If no, then create a new note

    fetchJson(`http://localhost:${joplinPort}/search?token=` + joplinToken + "&query=" + pageTitle);
  }
}

document.getElementById('exportNotesJoplin').addEventListener('click', function(){exportJoplinNotes(notify=true);}, false);


//// Periodically save notes to Jopin every 5 seconds ////
function perdiodicExportJoplinNotes(){
  // Check if note has been taken or someone has added a tag 
  if(note_count>1 || document.getElementById('tagsWBJS').value.length>0){
    exportJoplinNotes(notify=false);
  }
}
var intervalId = setInterval(perdiodicExportJoplinNotes,10000); 
