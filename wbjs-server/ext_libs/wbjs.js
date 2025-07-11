//////////////////////////
var note_count = 0;
// let colorsNotes = [
//     "rgba(255, 255, 255, 0.95)", // Default (White)
//     "rgba(255, 204, 204, 0.95)", // Light Red
//     "rgba(255, 224, 153, 0.95)", // Light Orange
//     "rgba(255, 255, 204, 0.95)", // Light Yellow
//     "rgba(229, 255, 204, 0.95)", // Light Green
//     "rgba(204, 255, 242, 0.95)", // Light Teal
//     "rgba(224, 247, 255, 0.95)", // Light Blue
//     "rgba(224, 235, 255, 0.95)", // Light Dark Blue
//     "rgba(235, 224, 255, 0.95)", // Light Purple
//     "rgba(255, 235, 245, 0.95)"  // Light Pink

// ];
let notesDB = {};

// Get suggested reading 
// fetch("http://127.0.0.1:3000/getSuggestedReading", { method: "POST" })
// .then(response => response.json())
// .then(data => {
//     console.log(data);
//     var parsed_data = JSON.parse(data);
//     var suggestedReading = parsed_data['suggestedReading'];
//     let suggestedContainer = document.getElementById('suggested-reading');
//     suggestedContainer.innerHTML = "<h5>Plugins:</h5>" + suggestedReading;
// });

// Get all tags 
// fetch("http://127.0.0.1:3000/getAllTags", { method: "POST" })
// .then(response => response.json())
// .then(data => {

//     var tagsDB = data['tags'];
//     var tagsOccurences = data['occurences'];
//     let tagsContainer = document.getElementById('tags-container');
//     tagsContainer.innerHTML =  "";

//     var count = 0;
//     tagsDB.forEach(function(tag) {
//         if(tag.length>0){
//             let tagDiv = document.createElement('button');
//             tagDiv.className = 'btn btn-outline-secondary btn-sm';
//             tagDiv.textContent = tag + " (" + tagsOccurences[count] + ")";
//             tagDiv.addEventListener('click', function() {   
//                 window.location.href = "http://127.0.0.1:3000/notesViewer?q=" + tag + "&tag=true";
//             });

//             tagsContainer.appendChild(tagDiv);
//         }
//         count +=1;
       
//     }); 
// });

function displayNotes(data) {
    var allData = data;
    var allDataKeys = Object.keys(allData);

    for (let i = 0; i < allDataKeys.length; i++) {
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

        if(allDataKeys.length>1){
             noteContentWrapper.className = 'note-content';
        }
        else{
            noteContentWrapper.className = 'note-content-singleNote';
        }
    
        var noteContent1 = document.createElement('div');
        noteContent1.className = 'container result';
        noteContent1.innerHTML = `
            <div class="result-title">
                <a href="http://${allDataKeys[i]}">${edjsData['TITLE']}</a>
            </div>
            <div class="text-muted">http://${allDataKeys[i]}</div>
            <div class="result-summary">${description}</div>
            <button class="toggle-notes" onclick="toggleNotes(${i})">Expand &darr;</button>
        `;
        // document.getElementById('note-container').appendChild(noteContent1);
    
        if (foo_loaded_keys.length > 0) {
            // Only insert div to page if there are notes
            document.getElementById('note-container').appendChild(noteContent1);
        }
    
        for (let j = 0; j < foo_loaded_keys.length; j++) {
            var noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.id = 'note' + note_count;
    
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
    if(allDataKeys.length < 10){
        for(let i = 0; i < 10; i++){
            try {
                toggleNotes(i);
            } catch (error) {
                console.error("Error toggling notes for index " + i + ": " + error);
            }
        }
    }
}

function toggleNotes(index) {
    var notes = document.querySelectorAll('.note-content')[index].querySelectorAll('.note');
    notes.forEach(note => {
        if (note.style.display === 'none' || note.style.display === '') {
            note.style.display = 'block';
        } 
        else {
            note.style.display = 'none';
        }
    });
}

// Search functionality/////
function searchDB(){
    var text = document.getElementById('search').value;

    document.getElementById('note-container').innerHTML = ''; // Clear the note container
    note_count = 0

    var dataPacket = {};
    dataPacket['key'] = text;

    fetch(`http://127.0.0.1:3000/search`,
    {
        body: JSON.stringify(dataPacket),
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
    }).then((results) => {
        results.json().then((data) => {
            displayNotes(data);
        })
    });

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

fetch(`http://127.0.0.1:3000/search`,
{
    body: JSON.stringify(dataPacket),
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
}).then((results) => {
    results.json().then((data) => {
        displayNotes(data);
    })
});

// Bind enter key to search
document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchDB();
    }
});

// document.getElementById('searchBtn').addEventListener('click', searchDB);
