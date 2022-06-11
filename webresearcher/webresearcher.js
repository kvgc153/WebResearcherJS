
document.addEventListener('keydown', workerFunction);
function workerFunction(e){
    var toggleHighlight= false;
    if(e.ctrlKey){
        //////// save annotation block ///////
        if(e.keyCode==saveAnnotationsKeyCode){
            var dict = {};
            // grab all notes
            var allNotes=document.getElementsByClassName("ui-widget-content");
            var allNotes_html = ''
            for(var i=0;i<allNotes.length;i++){
                allNotes_html+= allNotes[i].outerHTML; // getting all notes
            }

            // add note to local storage
            var makeNewID  = Number(new Date());
            localStorage.setItem(webPageUrl, allNotes_html.replaceAll("tooltip","tooltip"+ makeNewID));
            $.notify('Added notes to local storage', "success");
          }
         /// End of save annotation block///





        /////////////// Hightlight + Annotate block //////////////////////
        // highlight and annotate  when Ctrl+1 key is pressed

        if(e.keyCode ==createNoteKeyCode){
             ////////// Create Note block ///////////
            function createHighlight(range){
                var newNode = document.createElement("span");
                newNode.id = "popcorn"+note_count;
    //               newNode.setAttribute("style", "background-color:#d9ffcc;");
                newNode.appendChild(range.extractContents());
                range.insertNode(newNode);
            }

            if(window.getSelection().rangeCount >0){
                var selection = window.getSelection();
                var range = selection.getRangeAt(0);
                createHighlight(range);
            }

            ////////// annotate ///////////
            if(window.getSelection().rangeCount >0){

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

                ///
                document.getElementById("tooltip"+note_count).setAttribute("style","height: 200px; width: 350px;\
                border: none;color: black;  padding-right: 75px; padding-left: 25px;padding-top: 25px;padding-bottom: 25px; text-align: enter;\
                text-decoration: none;  display: inline-block; overflow:auto;resize:both;background-color:"+defaultNoteColor+";font-size:"+ defaultFont +";opacity:"+defaultOpacity);


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
                     onChange:(api, event) =>{
                          saved();
                      }
                  });



               ////// popper js block ///////////////////////
                const popcorn = document.querySelector("#"+"popcorn"+note_count);
                const tooltip = document.querySelector('#'+"tooltip"+note_count);
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

                $('#'+"tooltip"+note_count).mousedown(handle_mousedown); // move popper
                // addNotes();

              //////////// drag the annotation across the document ///////////
              /// from stackexchange - https://stackoverflow.com/questions/38405569/jquery-calling-function-to-parent-element
              function handle_mousedown(e){
                    window.my_dragging = {};
                    my_dragging.pageX0 = e.pageX;
                    my_dragging.pageY0 = e.pageY;
                    my_dragging.elem = this;
                    my_dragging.offset0 = $(this).offset();


                    function handle_dragging(e){
                      if(e.shiftKey){
                            var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
                            var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
                            $(my_dragging.elem)
                            .offset({top: top, left: left});
                    }
                    }

                    function handle_mouseup(e){
                          $('body')
                          .off('mousemove', handle_dragging)
                          .off('mouseup', handle_mouseup);
                    }

                    $('body')
                        .on('mouseup', handle_mouseup)
                        .on('mousemove', handle_dragging);
              }

                note_count+=1; // update note counter

              }
            }
           /// End of Create Note block  ///
    }

}
