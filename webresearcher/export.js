
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
       var allNotes_html1 = '<blockquote class="blockquote text-center"><button type="button" class="btn btn-primary btn-lg btn-block bg-dark text-white "><h3><a id="TEXT-export">Text:</a></h3></button></blockquote>';

       var dates = $('[id^="tooltip"]');


       for(var i=0;i<allNotes.length;i++){

           allNotes_html1+=  '<a href="'+url_window+"#"+dates[i].id+ '"">'  +"Note: "+ i+    "</a><br>";
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
           $("body").append ( '                                           \
               <div id="notesHTML" style="left: 10%; height: 80%; \
           position: fixed; width: 100%; bottom: 5%;background-color:white; border-style: double;  border-radius: 10px; opacity:100%; overflow-y: scroll; \
           display: inline-block; max-width: 80%;overflow-x: hidden;"> This is a test </div>                                                      \
           ');
           $("#notesHTML").html(
             '<blockquote class="blockquote text-center"><h1> Page notes : ' + url_window + '</h1></blockquote><br>'
             +  allNotes_html1
             +' <hr><blockquote class="blockquote text-center"><button type="button" class="btn btn-primary btn-lg btn-block bg-dark text-white " ><h3><a id="HTML-export">HTML :</a></h3></button></blockquote><code><pre>'
             +allNotes_html1.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
             +"</pre></code>"
             +' <hr><blockquote class="blockquote text-center"><button type="button" class="btn btn-primary btn-lg btn-block bg-dark text-white "><h3><a id="JSON-export">JSON :</a></h3></button></blockquote><code><pre>'
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
