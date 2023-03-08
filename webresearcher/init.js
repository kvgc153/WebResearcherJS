// corresponds to 1 on keyboard -- Ctrl + 1 triggers creation of note
var createNoteKeyCode = 49 ;  

// variables used //
var note_count = 1;
var webPageUrl = window.location.href.replace(/(^\w+:|^)\/\//, '');
var url_window = window.location.href;
var pageTitle = document.title;

// controls the specs of the notes
var defaultNoteColor = "#ffffcc";
var defaultFont= "13px";
var defaultOpacity = "80%";

// variables used to store the notes and noteobjects 
var editorJSObjs = {};
var WBJS_HTML = {};
var WBJS_CSS = {};
var WBJS_JSON = {};

// classes used for highlighting text 
var classnames =["color1","color2","color3","color4","color5","color6","color7","color8"];

// Add Buttons to the page for control
var htmlAppend = $("html").append(`
<div class = "userButtonPanelWBJS">
	<button class="badge btn btn-primary " style="width:100%" id='saveNotesWBJS'>Save</button>
	<button class="badge btn btn-primary " style="width:100%" id='exportNotes'>Copy (TW)</button>
</div> 
`);

// Sidebar (under testing)
// <button class="badge btn btn-primary " style="width:100%" id='exportNotes1'>Copy (TW)</button>
// <div class="sidebar left" id="WBJS_sidebar" style="width:80%; background-color:'blue';">
// <h3> Notes Summary </h3>
// </div>
// var sidebarStatus = false; 
// document.getElementById('exportNotes1').addEventListener('click', ()=>{
//   if(sidebarStatus){
//     $(".sidebar.left").sidebar().trigger("sidebar:close");
//     sidebarStatus = false;
//   }
//   else{
//     $(".sidebar.left").sidebar().trigger("sidebar:open");
//     sidebarStatus = true;
//   }
// })
