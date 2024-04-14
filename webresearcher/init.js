// corresponds to 1 on keyboard -- Ctrl + 1 triggers creation of note
var createNoteKeyCode = 49 ;  

// variables used //
var note_count = 1;
var webPageUrl = window.location.href.replace(/(^\w+:|^)\/\//, '');
webPageUrl = webPageUrl.split("#")[0];
var webHash = window.location.hash;
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
<div id="userButtonPanelWBJS" class = "userButtonPanelWBJS">
	<div class ="btn" style="width:100%; text-align: center; font-weight:1000"> 
	<input type="text" id="tagsWBJS" style="width:100%;font-family: inherit; font-size:15px; height:25px; " placeholder="Enter Tags: Comma-separated"><br>
	</div>
	<div>
	<button class="btn btn-layered-3d btn-layered-3d--blue" style="width:100%; text-align: center;" id="makeNoteButton">Make Note </button><br>
	<button class="btn btn-layered-3d btn-layered-3d--purple " style="width:100%; text-align: center;" id='saveNotesWBJS'>Browser</button><br>
	<button class="btn btn-layered-3d btn-layered-3d--purple" style="width:100%; text-align: center;" id='exportNotesJSON'>JSON</button><br>
	</div>
</div> 
`);
$("#userButtonPanelWBJS").draggable();
