// corresponds to 1 on keyboard -- Ctrl + 1 triggers creation of note
var createNoteKeyCode = 49 ;  

// variables used //
var note_count = 1;
var webPageUrl = window.location.href.replace(/(^\w+:|^)\/\//, '');
webPageUrl = webPageUrl.split("#")[0];
var webHash = window.location.hash;
var url_window = window.location.href;
var pageTitle = document.title;
pageTitle = pageTitle.replace(/\|/g, "");

// controls the specs of the notes
var defaultNoteColor = "#E6E6FA";
var defaultFont= "13px";
var defaultOpacity = "95%";


// variables used to store the notes and noteobjects 
var editorJSObjs = {};
var WBJS_HTML = {};
var WBJS_CSS = {};
var WBJS_JSON = {};

// Add Buttons to the page for control
var htmlAppend = $("html").append(`
<div id="userButtonPanelToggler" class="userButtonPanelWBJSToggler">
    <button class="btn btn-layered-3d btn-layered-3d--blue" style="width:100%; text-align: center;">WBJS</button>
</div>

<div id="userButtonPanelWBJS" class="userButtonPanelWBJS">
    <div class="btn" style="width:100%; text-align: center; font-weight:1000"> 
        <div id="panelMover" style="cursor:grab">&#10021;</div>
        <div id="tagsList">
            <input type="text" id="tagsWBJS" style="width:90%;font-family: inherit; font-size:15px; height:25px;" placeholder="Enter Tags: Comma-separated">
            <br>
            <div id="showTags"></div>
        </div>
    </div>
	<div id = "notesOnPage" class="toc">

	</div>	
    <div>
        <button class="btn btn-layered-3d btn-layered-3d--blue" style="width:100%; text-align: center;" id="makeNoteButton">Make Note</button>
        <br>
        <button class="btn btn-layered-3d btn-layered-3d--purple" style="width:100%; text-align: center;" id='saveNotesWBJS'>Save</button>
        <br>
    </div>

</div>
`);
$("#userButtonPanelWBJS").draggable();
