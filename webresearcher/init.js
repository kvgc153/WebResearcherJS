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

// Add Buttons to the page for control
var htmlAppend = $("html").append(`
<div id="userButtonPanelWBJS" class = "userButtonPanelWBJS">
	<div class ="btn" style="width:100%; text-align: center; font-weight:1000"> 
	&#10021;
	<input type="text" id="tagsWBJS" style="width:100%;font-family: inherit; font-size:15px; height:25px; " placeholder="Enter Tags: Comma-separated"><br>
    
	</div>
	<div>
	<button class="btn btn-layered-3d btn-layered-3d--blue" style="width:100%; text-align: center;" id="makeNoteButton">Make Note </button><br>
	<button class="btn btn-layered-3d btn-layered-3d--purple" style="width:100%; text-align: center;" id='exportNotesJoplin'>Joplin </button><br>
	</div>
</div> 
`);
$("#userButtonPanelWBJS").draggable();


// Find Joplin port 
async function findPort() {
    let port = null;

    for (let portToTest = 41184; portToTest <= 41194; portToTest++) {
        const result = await pingPort(portToTest); // Call GET /ping
        if (result === 'JoplinClipperServer') {
            port = portToTest; // Found the port
            break;
        }
    }

    return port;
}

async function pingPort(port) {
    try {
        const response = await fetch(`http://localhost:${port}/ping`);
        if (!response.ok) {
            throw new Error(`Error pinging port ${port}: ${response.statusText}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error(error);
        return null;
    }
}
// Code to get the joplin port -- takes a while to run
// findPort().then(port => {
//     if (port !== null) {
// 		joplinPort = port;
//         console.log(`Found Joplin Clipper Server on port ${port}`);
//     } else {
//         console.log('Joplin Clipper Server not found on any tested port');
//     }
// });

var joplinPort = 41184;


