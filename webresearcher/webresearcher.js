//// variables
var note_count=1;



/////////////// Hightlight + Annotate block //////////////////////
// highlight and annotate  when tilde(`) key is pressed

/// customizable variables
/// Go to https://keycode.info/ to find keycodes

var createNoteKeyCode = 49 ;  // corresponds to 1 on keyboard
var saveAnnotationsKeyCode= 50; // corresponds to 2 on keyboard
var loadAnnotationsKeyCode=51 ; // corresponds to 3 on keyboard
var startmqttKeyCode=52 ; // corresponds to 4 on keyboard
var saveAllNotes = 53; // correspodns to 5 on keyboard
var displayNotes = 48; // correspodns to 0 on keyboard

// controls the specs of the notes
var defaultNoteColor = "#ffffcc";
var defaultFont= "13px";
var defaultOpacity = "80%";
var sidebarWidth    = "30%";


/////// variables used /////////
var note_count=1;
var webPageUrl = window.location.href.replace(/(^\w+:|^)\/\//, '');
var url_window = window.location.href;
var pageTitle = document.title;


// Displays all the notes in a bigger window for the user to copy
// Formats shown:  Text, HTML, JSON

document.addEventListener('keydown', displayAllNotes);
function displayAllNotes(e){
  if(e.ctrlKey){
      if(e.keyCode==displayNotes){

        $("#notesHTML").remove();

        // grab all notes
       var allNotes=document.getElementsByClassName("ui-widget-content");
       var allNotes1=document.getElementsByClassName("pell-content");
       var allNotes_html1 = '<blockquote class="blockquote text-center"><button type="button" class="class="btn btn-primary"><h3><a id="TEXT-export">Text:</a></h3></button></blockquote>';

       var dates = $('[id^="tooltip"]');


       for(var i=0;i<allNotes.length;i++){

           allNotes_html1+=  '<a href="'+url_window+"#"+dates[i].id+ '"">' +url_window+"#"+dates[i].id+ "</a><br>";
           allNotes_html1+= "<blockquote>"+allNotes1[i].innerHTML+"</blockquote>";

       }
       var parseTiddlywiki =  {
         "type":"text/html",
         "rawtitle":pageTitle,
         "link": url_window,
         "title": pageTitle,
         "tags": "web",
         "text": allNotes_html1.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
       };
       var parseTiddlywiki_raw =  {
         "type":"text/html",
         "rawtitle":pageTitle,
         "link": url_window,
         "title": pageTitle,
         "tags": "web",
         "text": allNotes_html1
       };
       // downloadObjectAsJson(parseTiddlywiki,"parseTiddlywiki");

           $("body").append ( '                                           \
               <div id="notesHTML" style="left: 10%; height: 80%; \
           position: fixed; width: 100%; bottom: 5%;background-color:white; border-style: double;  border-radius: 10px; opacity:100%; overflow-y: scroll; \
           display: inline-block; max-width: 80%;overflow-x: hidden;"> This is a test </div>                                                      \
           ');
           $("#notesHTML").html(
             '<blockquote class="blockquote text-center"><h1> Page notes : ' + url_window + '</h1></blockquote><br>'
             +  allNotes_html1
             +' <hr><blockquote class="blockquote text-center"><button type="button" class="class="btn btn-primary"><h3><a id="HTML-export">HTML (right click to save):</a></h3></button></blockquote><code><pre>'
             +allNotes_html1.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
             +"</pre></code>"
             +' <hr><blockquote class="blockquote text-center"><button type="button" class="class="btn btn-primary"><h3><a id="JSON-export">JSON (right click to save):</a></h3></button></blockquote><code><pre>'
             +  JSON.stringify(parseTiddlywiki, null, 4)
             +"</pre></code>"

         );

        function saveNotestoDisk(saveFormat,saveObj,objID){
          var data = "data:text/"+saveFormat+";charset=utf-8," + encodeURIComponent(JSON.stringify(saveObj));
          document.getElementById(objID).setAttribute("href",     data);
          document.getElementById(objID).setAttribute("download",  "notes."+saveFormat);
        }
        saveNotestoDisk("html",allNotes_html1,"HTML-export");
        saveNotestoDisk("json",parseTiddlywiki_raw,"JSON-export");





           $('#notesHTML').delay(15000).fadeOut('slow');

      }
    }
  }



document.addEventListener('keydown', workerFunction);
function workerFunction(e){

    var toggleHighlight= false;

    if(e.ctrlKey){


        //////// save annotation block ///////
        /// Saves the annotations to local .txt file when Ctrl+3 is pressed
        if(e.keyCode==saveAnnotationsKeyCode){
            var dict = {};

            // grab all notes
            var allNotes=document.getElementsByClassName("ui-widget-content");
            var allNotes_html = ''

            for(var i=0;i<allNotes.length;i++){
                allNotes_html+= allNotes[i].outerHTML; // getting all notes
            }

            // add note to local storage
            var currentAnnotations = localStorage.getItem("annotations");
            localStorage.setItem("annotations",currentAnnotations +  "\n " + webPageUrl + "," + makeNewID);
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

        /////////////// Hightlight + Annotate block //////////////////////
        // highlight and annotate  when Ctrl+1 key is pressed

        if(e.keyCode ==createNoteKeyCode){

             ////////// highlighting ///////////


            function createHighlight(range){

              var newNode = document.createElement("span");
              newNode.id = "popcorn"+note_count;


//               newNode.setAttribute("style", "background-color:#d9ffcc;");

              newNode.appendChild(range.extractContents());``
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

              newNode1.innerHTML= `

              <div id=`+"tooltip"+note_count + ` class="pell" >
              </div>
              `;

              document.getElementById("tooltip"+note_count).setAttribute("style","height: 130px; width: 300px;\
              border: none;color: black;  padding: 15px 15px; text-align: enter;\
              text-decoration: none;  display: inline-block; overflow:auto;resize:both;background-color:"+defaultNoteColor+";font-size:"+ defaultFont +";opacity:"+defaultOpacity)

              const editor = pell.init({
                element: document.getElementById("tooltip"+note_count),
                onChange: html => {
                },
                defaultParagraphSeparator: 'p',
                styleWithCSS: true,
                actions: [
                  'bold',
                  // 'quote',
                  'olist',
                  'ulist',
                  'code',
                  'link',
                  'image'
                ],
                classes: {
                  actionbar: 'pell-actionbar',
                  button: 'pell-button',
                  content: 'pell-content',
                  selected: 'pell-button-selected'
                }
              })

              editor.content.innerHTML = '<br>'

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
       /// End of Hightlight + Annotate block  ///
    }

}
// script to add sidebar with all the notes

$("body").append ( '                                           \
    <div id="allNotes" style="display: inline-block;resize:both;left: 70%; height: 100%; \
position: fixed; width: 29.5%; bottom: 0%;background-color:white; border-style: double;  border-radius: 10px; opacity:80%; overflow-y: scroll; \
display: inline-block; max-width: 80%;overflow-x: hidden;">  If you see this, something is not working </div>                                                     \
' );

function addNotes(){
     // grab all notes
    var allNotes=document.getElementsByClassName("ui-widget-content");
    var allNotes1=document.getElementsByClassName("pell-content");
    var allNotes_html = '<blockquote class="blockquote text-center"><h1 > Page notes  </h1></blockquote><br>';

    var dates = $('[id^="tooltip"]');


    for(var i=0;i<allNotes.length;i++){
        allNotes_html+= '<div class="card border-dark mb-3" > <div class="card-body"> ';
        allNotes_html+=  '<button type="button" class="class="btn btn-link card-title"><a href="'+url_window+"#"+dates[i].id+ '"">' +url_window+"#"+dates[i].id+ "</a></button><br>";
        allNotes_html+= '<blockquote class="blockquote"><small class="text-mute card-text">'+allNotes1[i].innerHTML+'</small></blockquote>';
        allNotes_html+= ' </div></div> ';

    }


    $("#allNotes").html(allNotes_html);
    const timer=setTimeout(addNotes, 2000);

}
addNotes();




$("html").css (
{
    position:   "relative",
    width:      "calc(100% - " + sidebarWidth + ")",
}
);
