/// customizable variables
/// Go to https://keycode.info/ to find keycodes
var createNoteKeyCode = 49 ;  // corresponds to 1 on keyboard

// controls the specs of the notes
var defaultNoteColor = "#ffffcc";
var defaultFont= "13px";
var defaultOpacity = "80%";

/////// variables used /////////
var note_count = 1;
var webPageUrl = window.location.href.replace(/(^\w+:|^)\/\//, '');
var url_window = window.location.href;
var pageTitle = document.title;

var editorJSObjs = {};
var WBJS_HTML = {};
var WBJS_CSS = {};
var WBJS_JSON = {};

var classnames =["color1","color2","color3","color4","color5","color6","color7","color8"];
/// Add Buttons to the page for control
$("html").append(`
  <div  style="left: 90%; height: 7%; position: fixed; width: 10%; bottom: 80%;z-index:100;background-color:white">
  <button style="width:100%;border-radius: 8px;font-size:100%" id='saveNotesWBJS'>Save Notes</button>
  <button style="width:100%;border-radius: 8px;font-size:100%" id='exportNotes'>Export to TiddlyWiki</button>
  </div> `);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



  // Check if there are any notes already in localstorage and if so load them up

  if(localStorage.getItem(webPageUrl)!=null){
    var foo_loaded = JSON.parse(localStorage.getItem(webPageUrl));
    var foo_loaded_keys = Object.keys(foo_loaded['HTML']);

    for(k=0;k<foo_loaded_keys.length;k++){
          console.log("Inside loop");
          var newNode1 = document.createElement("div");
          newNode1.classList.add("ui-widget-content");
          document.body.appendChild(newNode1)
          newNode1.setAttribute("style", "display: inline-block;overflow:auto;");

           // allows user to delete the imported annotation by clicking the right click after user confirmation
          newNode1.addEventListener('contextmenu', function(ev) {
          if(confirm("Are you sure you want to delete this note?")){
            ev.preventDefault();
            ev.target.remove();
            return false;
          }}, false);

          /// Make div for note
          newNode1.innerHTML= `
            <div id=`+"tooltip" + note_count
            +`>
            </div>
            `;
          let notestyleProps = foo_loaded['CSS'][foo_loaded_keys[k]];
          let notestyleEl =   document.getElementById("tooltip"+note_count).style;

          // Tried to set the entire object as CSS. For some reason it fails.
          // Manually set the css elements instead.. yiikkess!!!
          notestyleEl.height = notestyleProps.height;
          notestyleEl.width = notestyleProps.width;
          notestyleEl.color = notestyleProps.color;
          notestyleEl.padding = notestyleProps.padding;
          notestyleEl.textDecoration = notestyleProps.textDecoration;
          notestyleEl.display = notestyleProps.display;
          notestyleEl.overflow = notestyleProps.overflow;
          notestyleEl.backgroundColor = notestyleProps.backgroundColor;
          notestyleEl.fontSize = notestyleProps.fontSize;
          notestyleEl.opacity = notestyleProps.opacity;
          notestyleEl.position = notestyleProps.position;
          notestyleEl.inset = notestyleProps.inset;
          notestyleEl.margin = notestyleProps.margin;
          notestyleEl.transform = notestyleProps.transform;
          notestyleEl.resize = "both";


          editorJSObjs[note_count] = new EditorJS({
               holder: "tooltip"+note_count,
                tools: {
                 header: {
                   class: Header,
                   inlineToolbar:true,
                   config: {
                     placeholder: 'Header'
                   },
                   shortcut: 'CMD+SHIFT+H'
                 },
                 image: SimpleImage,
                 list: {
                   class: List,
                   inlineToolbar: true,
                   shortcut: 'CMD+SHIFT+L'
                 },
                 quote: {
                   class: Quote,
                   inlineToolbar: true,
                   config: {
                     quotePlaceholder: 'Enter a quote',
                     captionPlaceholder: 'Quote\'s author',
                   },
                   shortcut: 'CMD+SHIFT+O'
                 }
               },
               data:  foo_loaded['JSON'][foo_loaded_keys[k]],
               // readOnly: true, // for now dont allow users to edit the previous imported notes.. Needd some fixes before that..

            });

          note_count+=1; // update note counter
    }
  }



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


  // async function which automatically saves the notes to localstorage every 30 seconds
  async function saved(){

    console.log("saved");
  // save all the notes created so far
    for(i=1;i<note_count;i++){
        // console.log("tooltip"+i);
        let notestyleEl = document.getElementById("tooltip"+i).style;
        let notestyleProps = {
          "height":notestyleEl.height,
          "width":notestyleEl.width,
          "border":notestyleEl.border,
          "color":notestyleEl.color,
          "padding":notestyleEl.padding,
          "textDecoration":notestyleEl.textDecoration,
          "display":notestyleEl.display,
          "overflow":notestyleEl.overflow,
          "resize":notestyleEl.resize ,
          "backgroundColor":notestyleEl.backgroundColor,
          "fontSize":notestyleEl.fontSize,
          "opacity":notestyleEl.opacity,
          "position":notestyleEl.position,
          "inset":notestyleEl.inset,
          "margin":notestyleEl.margin,
          "transform":notestyleEl.transform
        }



        await editorJSObjs[i].save()
        .then((savedData) =>{
            // Convert JSON to html using parser
            const edjsParser = edjsHTML();
            let html = edjsParser.parse(savedData);

            // Save the JSON, CSS
            WBJS_JSON[i] = savedData;
            WBJS_CSS[i] = notestyleProps;
            WBJS_HTML[i] = html.join('');


            for(foo_HTML=0; foo_HTML<html.length;foo_HTML++){
              console.log(html[foo_HTML]);
              /// MARKJS
              var div = document.createElement("div");
              div.innerHTML =   html[foo_HTML] ;
              var text = div.textContent || div.innerText || "";
              div.innerHTML = '';
              var brands = text;

              // console.log(brands);
              var instance = new Mark(document.querySelector("body"));

              instance.mark(brands, {
                  separateWordSearch: false,
                  accuracy: {
                    value: "partially",
                    limiters: [".", ",", "!"]
                  },
                  exclude: [".ui-widget-content *"],
                  className: classnames[getRandomInt(classnames.length)]

                            });

            }


        }).catch((error) =>{
            console.log(error);
        })
    }
    let foo_final ={};
    foo_final['HTML'] = WBJS_HTML;
    foo_final['JSON'] = WBJS_JSON;
    foo_final['CSS']  = WBJS_CSS;
    console.log("auto saving data");
    localStorage.setItem(webPageUrl,JSON.stringify(foo_final));




  }
  saved();
  var intervalId = setInterval(saved,15000);


//export Notes to TiddlyWiki
document.getElementById('exportNotes').addEventListener('click', ()=>{
    var exportHTML=[];
    exportHTML[0]= "<table><tr><td>URL</td><td>Title</td></tr><tr><td>"+url_window+"</td> <td>"+pageTitle+"</td> </tr></table>";

    for(foo_exp=1; foo_exp<note_count; foo_exp++){
      exportHTML[foo_exp] = "<h3>Note:"+foo_exp+"</h3>"+WBJS_HTML[foo_exp]+"<hr><br>";
    }

    console.log("User asked to export notes to TW. Opening new window...");
    window.open(TWFilepath+"?action=createtid&name="+ encodeURIComponent(pageTitle)  +"&content="+encodeURIComponent(exportHTML.join('')));


  });
