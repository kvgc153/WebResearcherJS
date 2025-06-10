//////////////////////////
var note_count = 0;
let colorsNotes = [
    "rgba(255, 255, 255, 0.95)", // Default (White)
    "rgba(255, 204, 204, 0.95)", // Light Red
    "rgba(255, 224, 153, 0.95)", // Light Orange
    "rgba(255, 255, 204, 0.95)", // Light Yellow
    "rgba(229, 255, 204, 0.95)", // Light Green
    "rgba(204, 255, 242, 0.95)", // Light Teal
    "rgba(224, 247, 255, 0.95)", // Light Blue
    "rgba(224, 235, 255, 0.95)", // Light Dark Blue
    "rgba(235, 224, 255, 0.95)", // Light Purple
    "rgba(255, 235, 245, 0.95)"  // Light Pink

];
let notesDB = {};

// Remove the togglers 
document.getElementById('userButtonPanelWBJS').remove();
document.getElementById('userButtonPanelToggler').remove();

function displaySearchNotes(data) {
    var allData = data;
    var allDataKeys = Object.keys(allData);

    for (let i = 0; i < allDataKeys.length; i++) {
        console.log("Adding note for: " + allDataKeys[i]);
        var edjsData = JSON.parse(allData[allDataKeys[i]]);
        var foo_loaded_keys = Object.keys(edjsData['JSON']);
        var description = "";
        if(edjsData['META'] == undefined){
            description = "";
        }
        else{
            description = edjsData['META']['description'] || edjsData['META']['twitter:description'] || edjsData['META']['og:description'] || "" ;
        }
        var noteContentWrapper = document.createElement('div');
        noteContentWrapper.className = 'note-content';
    
        var noteContent1 = document.createElement('div');
        noteContent1.className = 'container result';
        noteContent1.innerHTML = `
            <div class="result-title">
                <a href="http://${allDataKeys[i]}">${edjsData['TITLE']}</a>
            </div>
            <div class="text-muted">http://${allDataKeys[i]}</div>
            <div class="result-summary">${description}</div>
        `;
        // document.getElementById('note-container').appendChild(noteContent1);
                // <button class="toggle-notes" onclick="toggleNotes(${i})">Expand &darr;</button>

        if (foo_loaded_keys.length > 0) {
            // Only insert div to page if there are notes
            document.getElementById('note-container').appendChild(noteContent1);
        }
    
        for (let j = 0; j < foo_loaded_keys.length; j++) {
            var noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.id = 'note' + note_count;
            noteDiv.style.display = 'block';
    
            var titleInput = document.createElement('div');
            titleInput.className = 'note-title';
            var titleCount = j + 1;
    
            titleInput.innerHTML = `
                Note-${titleCount} 
                <a href="http://${allDataKeys[i]}#tooltip${titleCount}">[Edit]</a> 
                <a href="http://127.0.0.1:3000/notesViewer?q=${allDataKeys[i]}#tooltip${titleCount}">[Cite]</a>
            `;
    
            noteDiv.appendChild(titleInput);
            noteContentWrapper.appendChild(noteDiv);
    
            var edjsnote = new EditorJS({
                holder: "note" + note_count,
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                        config: {
                            placeholder: 'Header'
                        },
                        shortcut: 'CMD+SHIFT+H'
                    },
                    image: SimpleImage,
                    embed: {
                        class: Embed,
                        config: {
                            services: {
                                youtube: true,
                                github: true,
                                vimeo: true,
                            }
                        }
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+L'
                    },
                    quote: {
                        class: Quote,
                        inlineToolbar: true,
                        config: {
                            quotePlaceholder: 'Enter a quote',
                            captionPlaceholder: 'Quote\'s author',
                        },
                        shortcut: 'CMD+SHIFT+O'
                    },
                    code: CodeTool,
                    attaches: {
                      class: AttachesTool,
                      config: {
                        endpoint: 'http://127.0.0.1:3000/uploadFile'
                      }
                    }
                },
                data: edjsData['JSON'][foo_loaded_keys[j]],
                readOnly: true
            });
            note_count += 1;
        }
    
        document.getElementById('note-container').appendChild(noteContentWrapper);
    }
}



function displaySearchNotesInit(message) {
//   console.log(message.response)
  displaySearchNotes(JSON.parse(message.response));
}


// Search functionality/////
function searchDB(){
    var text = document.getElementById('search').value;

    document.getElementById('note-container').innerHTML = ''; // Clear the note container
    note_count = 0

    var dataPacket = {};
    dataPacket['key'] = text;
    notifyBackgroundPage(
        greeting="search",
        data = JSON.stringify(dataPacket),
        respond = displaySearchNotesInit
    );

};


// Get query from URL 
const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);
const urlSearch = urlParams.get('q') || '';
const tagFlag   = urlParams.get('tag') || false;
document.getElementById('search').value = urlSearch;




var dataPacket = {};
dataPacket['key'] = urlSearch;
dataPacket['tag'] = tagFlag;


notifyBackgroundPage(
  greeting="search",
  data = JSON.stringify(dataPacket),
  respond = displaySearchNotesInit
);


// Bind enter key to search
document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchDB();
    }
});

// document.getElementById('searchBtn').addEventListener('click', searchDB);

// // If user hovers on a link-autocomplete editorjs note, show the note as a tooltip 
// document.addEventListener('mouseover', function(event) {
//     const target = event.target;
//     if(target.tagName === 'A'){
//         const noteText = target.getAttribute('href');
//         if (!noteText) return; // If no note text, do nothing
//         if(noteText.includes('/notes/docs/')){
//             // Remove any existing tooltip
//             document.getElementById('WBJSNoteTextTooltip')?.remove();
//             // Create a tooltip element
//             let tooltip = document.createElement('div');
//             tooltip.className = 'WBJSNotePDFs';
//             tooltip.id = "WBJSPDFTextTooltip";

//             // Add a close button to the tooltip
//             let closeButton = document.createElement('button');
//             closeButton.textContent = 'Close';
//             closeButton.className = 'btn btn-layered-3d--purple';
//             closeButton.addEventListener('click', function() {
//                 document.getElementById('WBJSPDFTextTooltip')?.remove();
//             });
//             tooltip.appendChild(closeButton);
//             tooltip.innerHTML = tooltip.innerHTML + `<iframe src="${noteText}" style="width: 100%; height: 100%; border: none;"></iframe>`;

//             document.body.appendChild(tooltip);

//             // Position the tooltip
//             const rect = target.getBoundingClientRect();
//             tooltip.style.left = `${rect.left + window.scrollX}px`;
//             tooltip.style.top = `${rect.bottom + window.scrollY}px`;

//     }
//         // tooltip.addEventListener('mouse')
//         // Remove the tooltip when mouse leaves the link
//         // target.addEventListener('click', function() {
//         //     document.getElementById('WBJSPDFTextTooltip')?.remove();
//         // }, { once: true });
        
//     }
// });