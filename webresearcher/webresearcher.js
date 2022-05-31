
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


         if(e.keyCode==saveAllNotes){
            var currentAnnotations = localStorage.getItem("annotations");
            var encode_obj= encodeURIComponent(currentAnnotations);
            // save note  as text file
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/txt;charset=utf-8,' + encode_obj;
            hiddenElement.target = '_blank';
            hiddenElement.download = 'all_annotations.csv';
            hiddenElement.click();
         }


          /////////////// Upload annotations block //////////////////////
          // Allow user to upload annotations when the Ctrl+2 key is pressed- code adapted from
          //https://stackoverflow.com/questions/19038919/is-it-possible-to-upload-a-text-file-to-input-in-html-js/19039880

        if(e.keyCode==loadAnnotationsKeyCode){

            // load from local storage
            const cat = localStorage.getItem(webPageUrl);
            console.log(cat);

            $.notify('Loaded notes from local storage', "success");


            var AnnotationsBlock = document.createElement('div');
            AnnotationsBlock.id ="ImportedAnnotations";
            AnnotationsBlock.innerHTML=cat;
            document.body.appendChild(AnnotationsBlock);

            // Enable interactivity for all the imported annoations using jquery
              for(var dd1=0;dd1<AnnotationsBlock.childNodes.length;dd1++){
                for(var dd2=0;dd2<AnnotationsBlock.childNodes[dd1].childNodes.length;dd2++){

                  console.log(AnnotationsBlock.childNodes[dd1].childNodes[dd2].id);
                  $('#'+AnnotationsBlock.childNodes[dd1].childNodes[dd2].id).mousedown(handle_mousedown);

                }

                // allows user to delete the imported annotation by clicking the right click after user confirmation
                AnnotationsBlock.childNodes[dd1].addEventListener('contextmenu', function(ev) {
                if(confirm("Are you sure you want to delete this imported note?")){
                  ev.preventDefault();
                  ev.target.remove();
                  return false;
                }}, false);
              }


            function uploadText() {
              return new Promise((resolve) => {
                // create file input1`1
                const uploader = document.createElement('input')
                uploader.type = 'file'
                uploader.style.display = 'none'
                uploader.multiple=true;

                // listen for files
                uploader.addEventListener('change', () => {
                  const files = uploader.files

                  if (files.length) {
                    for(var dd=0;dd<files.length;dd++){
                      const reader = new FileReader()
                      reader.addEventListener('load', () => {
                        uploader.parentNode.removeChild(uploader)
                        resolve(reader.result)
                      })
                      reader.readAsText(files[0])
                    }

                  }
                })

                // trigger input
                document.body.appendChild(uploader)
                uploader.click()
              })
            }

          // usage example
            uploadText().then(text => {
              //once loaded check update the html page if the dictionary has the notes for the current URL
              var UserUploadedAnnotaions= JSON.parse(text)[webPageUrl ];
              var AnnotationsBlock = document.createElement('div');

              AnnotationsBlock.id ="ImportedAnnotations";
              AnnotationsBlock.innerHTML=UserUploadedAnnotaions;
              document.body.appendChild(AnnotationsBlock);


              // Enable interactivity for all the imported annoations using jquery
              for(var dd1=0;dd1<AnnotationsBlock.childNodes.length;dd1++){
//                 for(var dd2=0;dd2<AnnotationsBlock.childNodes[dd1].childNodes.length;dd2++){

//                   $('#'+AnnotationsBlock.childNodes[dd1].childNodes[dd2].id).mousedown(handle_mousedown);

//                 }

                  // allows user to delete the imported annotation by clicking the right click after user confirmation
                AnnotationsBlock.childNodes[dd1].addEventListener('contextmenu', function(ev) {
                if(confirm("Are you sure you want to delete this imported note?")){
                  ev.preventDefault();
                  ev.target.remove();
                  return false;
                }}, false);
              }
            })
          }
      addNotes();

        /// End of upload-annotation block///


        /// open notes
        if(e.keyCode==56){ // 8 key
          //show notes
          $("#allNotes").show();
          //Reset css
          $("html").css (
          {
              position:   "relative",
              width:      "calc(100% - " + sidebarWidth + ")",
          }
          );

        }





        if(e.keyCode==57){
          //Hide notes - 9 key
          $("#allNotes").hide();
          //Reset css

          $("html").css (
          {
              position:   "relative",
              width:      "100%",
          }
          );
        }

        /////////////// Hightlight + Annotate block //////////////////////
        // highlight and annotate  when Ctrl+1 key is pressed

        if(e.keyCode ==createNoteKeyCode || e.keyCode==55){
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

                ///////// annotation using pell note ///////////
                if(e.keyCode==createNoteKeyCode){
                newNode1.innerHTML= `
                  <div id=`+"tooltip"
                  + note_count
                  +` class="pell" >
                  </div>
                  `;
               }
               if(e.keyCode==55){
                  /// DO Not change the innerHTML unless you know what you are doing.. ///
                 newNode1.innerHTML= `
                 <div id=`+"tooltip"
                 + note_count
                 +` >
                <div class="pell-actionbar">
                </div>
                <div class="pell-content" contenteditable="false"></div>
                 </div>
                 `;
                   }
                ///////////////////////
                if(e.keyCode==createNoteKeyCode){
                    document.getElementById("tooltip"+note_count).setAttribute("style","height: 130px; width: 300px;\
                    border: none;color: black;  padding: 15px 15px; text-align: enter;\
                    text-decoration: none;  display: inline-block; overflow:auto;resize:both;background-color:"+defaultNoteColor+";font-size:"+ defaultFont +";opacity:"+defaultOpacity);


                    const editor = pell.init({
                            element: document.getElementById("tooltip"+note_count),
                            onChange: html => {
                            },
                            defaultParagraphSeparator: 'p',
                            styleWithCSS: true,
                            actions: [
                              'bold',
                              'olist',
                              'ulist',
                              'link',
                              {
                                  icon: '&#128247;',
                                  title: 'Image',
                                  result: () => {
                                    const url = window.prompt('Enter the image URL')
                                    //this implemention is different from the pell documentation to account for resizing
                                    if (url) document.execCommand('insertHTML',false, `
                                    <div style=" resize: both; overflow:auto;">
                                      <img width=100% height=100% src=`+url+"></div><br><br> ")
                                  }
                              },
                              {
                                icon: '&#9998;',
                                title: 'Insert HTML',
                                result: () => {
                                  const url = window.prompt('Enter HTML');
                                  if (url) document.execCommand('insertHTML',false, url)
                                }
                              },
                              {
                                icon: '&#10066;',
                                title: 'Change note color',
                                result: () => {
                                  const url = window.prompt('Enter color of note: [e.g., #ffffcc(default color), gray, purple,...]');

                                  if (url){
                                    document.getElementById(event.target.parentNode.parentNode.id).style.backgroundColor = url
                                  }
                                }
                              },
                              {
                                icon: '&#9997;',
                                title: 'Insert selected text into note',
                                result: () => {
                                  var sel = window.getSelection();
                                  var cont = document.createElement("blockquote");

                                  for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                                                  cont.appendChild(sel.getRangeAt(i).cloneContents());
                                             }

                                  editor.content.innerHTML += cont.outerHTML + "<div><br></div>" ;
                                }
                              }


                            ],
                            classes: {
                              actionbar: 'pell-actionbar',
                              button: 'pell-button',
                              content: 'pell-content',
                              selected: 'pell-button-selected'
                            }
                    })

                    editor.content.innerHTML = '<br>'
              }

              if(e.keyCode==55){
                  document.getElementById("tooltip"+note_count).setAttribute("style","height: 50px; width: 400px;\
                  border: none;  display: inline-block; overflow:auto;resize:both;background-color:"+defaultRectColor+";font-size:"+ defaultFont +";opacity:"+defaultRectOpacity);
                    }
              ///////////////


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
                addNotes();

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
