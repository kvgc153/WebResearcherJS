/// customizable variables
/// Go to https://keycode.info/ to find keycodes

var createNoteKeyCode = 49 ;  // corresponds to 1 on keyboard
var saveAnnotationsKeyCode= 50; // corresponds to 2 on keyboard
var loadAnnotationsKeyCode=51 ; // corresponds to 3 on keyboard
var startmqttKeyCode=52 ; // corresponds to 4 on keyboard
var saveAllNotes = 53; // corresponds to 5 on keyboard
var displayNotes = 48; // corresponds to 0 on keyboard

// controls the specs of the notes
var defaultNoteColor = "#ffffcc";
var defaultFont= "13px";
var defaultOpacity = "80%";
var sidebarWidth    = "30%";

// controls the specs of the highlighting rectangle
var defaultRectColor = 'green';
var defaultRectOpacity = '10%';

/////// variables used /////////
var note_count = 1;
var webPageUrl = window.location.href.replace(/(^\w+:|^)\/\//, '');
var url_window = window.location.href;
var pageTitle = document.title;
