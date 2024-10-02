// class handing creation of notes 
class WBJS{
  constructor(noteID){
    this.noteID = noteID;
  }

  addAnchor(){
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);

    var newNode = document.createElement("span");
    newNode.id = "popcorn" + this.noteID;
    newNode.appendChild(range.extractContents());
    range.insertNode(newNode);
  }

  makeWrapperNode(){
    var wrapperNode = document.createElement("div");
    wrapperNode.classList.add("ui-widget-content");
    wrapperNode.setAttribute("style", "display: inline-block;overflow:auto;");
    wrapperNode.innerHTML= `<div id="tooltip${this.noteID}"> <div class='mover' id="mover${this.noteID}" ><h2>${"Note: "+note_count}</h2></div></div>`;

    document.body.appendChild(wrapperNode)

    // allows user to delete the imported annotation by clicking the right click after user confirmation
    wrapperNode.addEventListener('contextmenu', function(ev) {
      if(confirm("Are you sure you want to delete this note?")){
        ev.preventDefault();
        ev.target.remove();
        return false;
       }},
    false);
  }

  makeTooltipNode(){
    var tooltipNode = document.getElementById("tooltip"+this.noteID);
    tooltipNode.setAttribute("style","background-color:"+defaultNoteColor+";font-size:"+ defaultFont +";opacity:"+defaultOpacity);
    tooltipNode.classList.add("WBJSNote")

    editorJSObjs[this.noteID] = new EditorJS({
      holder: "tooltip"+this.noteID,
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
      onChange: (api, event) => {
        // serverExport(notify=false);
      }
    });


  }
  popperAlign(){
    const popcorn = document.querySelector("#"+"popcorn"+this.noteID);
    const tooltip = document.querySelector('#'+"tooltip"+this.noteID);
    const popper_instance = Popper.createPopper(popcorn, tooltip, {
      placement: 'auto',
        modifiers: [
          {
            name: 'offset',
            options: {
            offset: [0, 0],
            },
          },
          { name: 'eventListeners', enabled: false }
        ],
    });

    $('#'+"mover"+note_count).mousedown(handle_mousedown); // move popper

  }

  createNote(){
    this.addAnchor();

    // The wrappernode wraps the tooltipnode. The tooltipnode contains the notes entered by the user.
    this.makeWrapperNode();
    this.makeTooltipNode();

    // Place created note next to selected text
    this.popperAlign();

  }

}

//  Press make note button in the userButtonPanelWBJS panel
$("#makeNoteButton").click(function(){
  // add selection to range
  const selection = window.getSelection();
  selection.removeAllRanges();
  const range = document.createRange();
  const node  = document.getElementById("makeNoteButton");
  range.selectNode(node);
  selection.addRange(range);

  // then make a note if there is a selection
  if(window.getSelection().rangeCount >0){
    let w = new WBJS(noteID = note_count);
    w.createNote();
    note_count+=1; // update note counter

  }
});