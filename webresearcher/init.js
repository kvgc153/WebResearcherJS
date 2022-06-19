/// customizable variables
/// Go to https://keycode.info/ to find keycodes
var createNoteKeyCode = 49 ;  // corresponds to 1 on keyboard

// controls the specs of the notes
var defaultNoteColor = "#ffffcc";
var defaultFont= "13px";
var defaultOpacity = "80%";

/////// variables used /////////
var note_count = 1;
var webPageUrl = window.location.href.replace(/(^\w+:|^)\/\//, '');
var url_window = window.location.href;
var pageTitle = document.title;

var editorJSObjs = {};
var WBJS_HTML = {};
var WBJS_CSS = {};
var WBJS_JSON = {};

var classnames =["color1","color2","color3","color4","color5","color6","color7","color8"];
/// Add Buttons to the page for control
var htmlAppend = $("html").append(`
  <div  style="left: 90%; height: 7%; position: fixed; width: 10%; bottom: 80%;z-index:100;background-color:white">
  <button style="width:100%;border-radius:5px;font-size:100%;height:50%" id='saveNotesWBJS'>Save</button>
  <button style="width:100%;border-radius:5px;font-size:100%;height:50%" id='exportNotes'>Export</button>
  </div> `);
