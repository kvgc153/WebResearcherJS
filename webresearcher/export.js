//   // export Notes to Joplin using API


async function serverExport(notify=false){
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

    console.log("User asked to export notes to Joplin.");
  }
}

document.getElementById('exportNotesJoplin').addEventListener('click', function(){serverExport(notify=true);}, false);
