// Check if there are any notes already in localstorage and if so load them up
$.notify("WBJS is initializing.", "info",{autoHideDelay: 30000});

function displayNotes(parsedJSON){
  var foo_loaded       = parsedJSON;
  // set tags
  var foo_tags          = foo_loaded['TAGS'] ?? ""; // if tags are not present, set it to empty string
  document.getElementById('tagsWBJS').value = foo_tags;

  var foo_loaded_keys   = Object.keys(foo_loaded['HTML']);
  

  for(k=0;k<foo_loaded_keys.length;k++){
    console.info("WBJS: Adding locally stored notes.");
    
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
          serverExport();
      }

      });
    $('#'+"tooltip"+note_count).mousedown(handle_mousedown); // move popper

    note_count+=1; // update note counter
  }
}


var foo_loaded = {};
var dataPacket = {};
dataPacket['key'] = webPageUrl;
fetch(fetchServer,
{
    body: JSON.stringify(dataPacket),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },          
}
).then((results) => {
  results.json().then((data) => {
    console.log(data);
    foo_loaded = JSON.parse(data.value);
    displayNotes(foo_loaded);
  }
)
});