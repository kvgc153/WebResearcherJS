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
	<div style="width:100%; text-align: center; background-color: white;"> Save to </div>
	<button class="badge btn btn-primary " style="width:100%" id='saveNotesWBJS'>LocalStorage</button>
	<button class="badge btn btn-primary " style="width:100%" id='exportNotesJoplin'>Joplin</button>
</div> 
`);
