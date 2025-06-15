// variables used //
var note_count = 1;
var webPageUrl = window.location.href.replace(/(^\w+:|^)\/\//, '');
webPageUrl = webPageUrl.split("#")[0];
var webHash = window.location.hash;
var url_window = window.location.href;
var pageTitle = document.title;
pageTitle = pageTitle.replace(/\|/g, "");


let WBJSConfig = {
    'note':{
        'color': "#E6E6FA",
        'fontsize': "13px",
        'opacity' : "95%"
    },
    'LLM':{
        'endpoint': "http://127.0.0.1:11434/api/chat",
        'model'   : "llama3.2",
        // This summarizePrompt is used when the user clicks summarize on the page tooltip
        'summarizePrompt' : "Summarize the following in two sentences and give me tags in hashtag format to remember them later. The tags must be returned in the following template only where TAG is the tag:<a href='http://127.0.0.1:3000/notesViewer?q=TAG'>#TAG</a>. Print only the summary and tags in HTML format. Text:",
        // The system and answer prompts are used INSIDE the notes.
        'systemPrompt' :  "ALWAYS answer the following questions using the following text ONLY. Text : ", 
        'answerPrompt' : ". Answer me only in HTML format and ONLY provide verbatim text from provided document as response unless absolutely essential. "
    }
}

// controls the specs of the notes
var defaultNoteColor = WBJSConfig['note']['color'];
var defaultFont= WBJSConfig['note']['fontsize'];
var defaultOpacity = WBJSConfig['note']['opacity'];


// variables used to store the notes and noteobjects 
var editorJSObjs = {};
var WBJS_HTML = {};
var WBJS_CSS = {};
var WBJS_JSON = {};
var tokenWBJS = "";
let serverWBJS = "";

// let LLMWBJSserver = WBJSConfig['LLM']['endpoint'];

// Add Buttons to the page for control
var htmlAppend = $("html").append(`
<div id="userButtonPanelToggler" class="userButtonPanelWBJSToggler">
    <button title="Open WebResearcher-notes" class="btnWBJS btnWBJS-layered-3d btnWBJS-layered-3d--blue" style="width:100%; text-align: center;"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
  <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
  <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
</svg></button>
</div>

<div id="userButtonPanelWBJS" class="userButtonPanelWBJS">
    <div class="btnWBJS" style="width:100%; text-align: center; font-weight:1000"> 
        <div id="panelMover" style="cursor:grab">&#10021;</div>
        <div id="tagsList">
            <textarea id="tagsWBJS" style="width:90%; font-family:inherit; font-size:15px; height:50px; overflow-y:auto;" placeholder="Enter Tags: Comma-separated"></textarea>            <br>
            <div id="showTags"></div>
        </div>
    </div>
	<div style="display:none" id = "notesOnPage" class="toc">

	</div>	
    <div>
        <button title="Make Note" class="btnWBJS btnWBJS-layered-3d btnWBJS-layered-3d--blue" style="width:100%; text-align: center;" id="makeNoteButton"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-stickies" viewBox="0 0 16 16">
  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1z"/>
  <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293z"/>
</svg></button>
        <br>
        <button title="Save Note" class="btnWBJS btnWBJS-layered-3d btnWBJS-layered-3d--purple" style="width:100%; text-align: center;" id='saveNotesWBJS'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-floppy2-fill" viewBox="0 0 16 16">
  <path d="M12 2h-2v3h2z"/>
  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1"/>
</svg></button>
        <br>
    </div>

</div>
`);
$("#userButtonPanelWBJS").draggable();


let WBJSTagsDB = {};
function initTagsDB(message) {
    WBJSTagsDB = JSON.parse(message.response);// Initialize the tags database with the response from the background script
    tokenWBJS  = message.token;
    serverWBJS = message.server;
    console.log("WBJS: Tags DB, server and token initialized");
}
notifyBackgroundPage(
    greeting="getAllTags",
    data = JSON.stringify({}),
    respond = initTagsDB,
);
document.getElementById('tagsList').addEventListener('input', function() {
    var userTags = document.getElementById('tagsWBJS').value;
    var userTagsArray = userTags.split(",");
    var enteredTag = userTagsArray[userTagsArray.length - 1]; // This is the tag that the user has entered

    // Do not show anything if the user has not entered anything
    if(enteredTag == "") {
        document.getElementById('showTags').innerHTML = "";
        return;
    }

    // Search through the tags in the database to see if anything matches
    var tagsDB = WBJSTagsDB['tags'];
    tagsHTML = "";
    let tagsContainer = document.getElementById('showTags');
    tagsContainer.innerHTML =  "";

    tagsDB.forEach(function(tag) {
        if (tag.includes(enteredTag)) {
            let tagDiv = document.createElement('button');
            tagDiv.className = 'tagWBJS';
            tagDiv.textContent = tag;
            tagDiv.addEventListener('click', function() {
                let tags = document.getElementById('tagsWBJS').value;
                let tagsArray = tags.split(",");
                tagsArray[tagsArray.length - 1] = tag;
                document.getElementById('tagsWBJS').value = tagsArray.join(",") + ",";
                tagsContainer.innerHTML = "";
            }); // onclick add tag and refresh the list
            tagsContainer.appendChild(tagDiv);
        }
    }); 

});

// If user hovers on a link-autocomplete editorjs note, show the note as a tooltip 
document.addEventListener('mouseover', function(event) {
    const target = event.target;
    if(target.tagName === 'A'){
        const noteText = target.getAttribute('data-notes-text');
        if (!noteText) return; // If no note text, do nothing

        // Remove any existing tooltip
        document.getElementById('WBJSNoteTextTooltip')?.remove();
        // Create a tooltip element
        let tooltip = document.createElement('div');
        tooltip.className = 'WBJSNote';
        tooltip.innerHTML = noteText;
        tooltip.id = "WBJSNoteTextTooltip";
        document.body.appendChild(tooltip);

        // Position the tooltip
        const rect = target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY}px`;

        // Remove the tooltip when mouse leaves the link
        target.addEventListener('click', function() {
            document.getElementById('WBJSNoteTextTooltip')?.remove();
        }, { once: true });
        
    }
});