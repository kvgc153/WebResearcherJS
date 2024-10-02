// Check if there are any notes already in localstorage and if so load them up
$.notify("WBJS is initializing.", "info",{autoHideDelay: 30000});


/// save Notes to localStorage when user clicks "save notes button" ///
function saveAllNotesWBJS(notify=true){
  // pack results into a dictionary
  let foo_final ={}
  foo_final['HTML'] = WBJS_HTML;
  foo_final['JSON'] = WBJS_JSON;
  foo_final['CSS']  = WBJS_CSS;
  foo_final['TAGS'] = document.getElementById('tagsWBJS').value;
  foo_final['TITLE'] = document.title || "";
  foo_final['URL'] = window.location.href;
  

  console.info("user asked to save data");
 // create note in localserver
 if(note_count>1 || foo_final['TAGS'] != ""){
  
  var dataPacket = {};
  dataPacket[webPageUrl] = JSON.stringify(foo_final);
  
  function sendNotification(message){
    if(message.response == "saved"){
      $.notify('Added notes to DB', "success");
    }
    if(message.response == "error"){
      $.notify('Error adding notes to DB', "error");
    }
    
  }

  let saveDB = notifyBackgroundPage(
    greeting="save",
    data = dataPacket,
    respond = sendNotification
  );










  }
}
document.getElementById('saveNotesWBJS').addEventListener('click', saveAllNotesWBJS);


// Bind to ctrl+s and save notes
document.addEventListener('keydown', function(event) {
  if (event.altKey && event.key === 's') {
    saveAllNotesWBJS();
    event.preventDefault();
  }
  // if its a mac and the user is using cmd+s
  if (event.metaKey && event.key === 's') {
    saveAllNotesWBJS();
    event.preventDefault();
  }
});



function displayNotes(parsedJSON){
  var foo_loaded       = parsedJSON;
  // set tags
  var foo_tags          = foo_loaded['TAGS'] ?? ""; // if tags are not present, set it to empty string
  document.getElementById('tagsWBJS').value = foo_tags;

  var foo_loaded_keys   = Object.keys(foo_loaded['CSS']);
  

  for(k=0;k<foo_loaded_keys.length;k++){
    console.info("WBJS: Adding locally stored notes.");

    if(k==0){
      // if there are notes, show the userButtonPanelWBJS and add a note list header
      document.getElementById('userButtonPanelToggler').style.display = 'none';
      $("#userButtonPanelWBJS").toggle();	
      document.getElementById('notesOnPage').innerHTML  = "<h5>Note List</h5>"; 
    }
    /// Add the note to the userButtonPanelWBJS ///
    var aFoo = document.createElement('a');
    aFoo.href = "#tooltip"+note_count;
    aFoo.innerHTML = 'Note '+note_count+'<br>';
    document.getElementById('notesOnPage').innerHTML += aFoo.outerHTML;
    ///////////////////////////////////////////////
    
    var newNode1 = document.createElement("div");
    newNode1.classList.add("ui-widget-content");
    document.body.appendChild(newNode1)
    newNode1.setAttribute("style", "display: inline-block; overflow:auto;");

    // allows user to delete the imported annotation by clicking the right click after user confirmation
    newNode1.addEventListener('contextmenu', function(ev) {
    if(confirm("Are you sure you want to delete this note?")){
      ev.preventDefault();
      ev.target.remove();
      return false;
    }}, false);

    /// Make div for note
    newNode1.innerHTML= `
      <div id=`+"tooltip" + note_count + ` class="WBJSNote"> 
      <div class='mover' id=`+"mover" + note_count +  `><h2>${"Note: "+note_count}</h2></div>
      </div>
      `;
    let notestyleProps = foo_loaded['CSS'][foo_loaded_keys[k]];
    let notestyleEl =   document.getElementById("tooltip"+note_count).style;

    // Tried to set the entire object as CSS. For some reason it fails.
    // Manually set the css elements instead.. yiikkess!!!
    notestyleEl.height            = notestyleProps.height;
    notestyleEl.width             = notestyleProps.width;
    notestyleEl.color             = notestyleProps.color;
    notestyleEl.padding           = notestyleProps.padding;
    notestyleEl.textDecoration    = notestyleProps.textDecoration;
    notestyleEl.display           = notestyleProps.display;
    notestyleEl.overflow          = notestyleProps.overflow;
    notestyleEl.backgroundColor   = notestyleProps.backgroundColor;
    notestyleEl.fontSize          = notestyleProps.fontSize;
    notestyleEl.opacity           = notestyleProps.opacity;
    notestyleEl.position          = notestyleProps.position;
    notestyleEl.inset             = notestyleProps.inset;
    notestyleEl.margin            = notestyleProps.margin;
    notestyleEl.transform         = notestyleProps.transform;
    notestyleEl.resize            = "both";


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
          },
          code: CodeTool,
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                github: true,
                vimeo: true,
              }
            }
          },
          link: {
            class: LinkAutocomplete,
            config: {
              endpoint: 'http://127.0.0.1:3000/searchWBJS',
              queryParam: 'search'
            }
          },
          ask: Ask          
          },
        data:  foo_loaded['JSON'][foo_loaded_keys[k]],
        onReady: () =>{
          if(webHash.length>0){
              //check if there are any hashes in the url and if so scroll to that note
            console.info("WBJS: Scrolling to note");
            var fooScroll  = document.querySelector(webHash);
            fooScroll.scrollIntoView();

          }
        },
        onChange: (api, event) => {
          // serverExport(notify=false);
      }

      });
    $('#'+"mover"+note_count).mousedown(handle_mousedown); // move popper

    note_count+=1; // update note counter
  }
}


var foo_loaded = {};
var dataPacket = {};
dataPacket['key'] = webPageUrl;

function initDB(message) {
  displayNotes(JSON.parse(message.response));
}

let DB = notifyBackgroundPage(
  greeting="fetch",
  data = JSON.stringify(dataPacket),
  respond = initDB,
);


