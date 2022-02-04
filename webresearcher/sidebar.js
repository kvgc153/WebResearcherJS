
// script to add sidebar containing all the notes

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
        allNotes_html+=  '<button type="button" class="class="card-title"><h5><a href="'+url_window+"#"+dates[i].id+ '"">' +"Note: "+ i+ "</a></h5></button><br>";
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
