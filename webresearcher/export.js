//   // export Notes to Joplin using API


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
