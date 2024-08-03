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

function displayNotes(data){
    var allData = data;
    var allDataKeys = Object.keys(allData);
    
    // Loop through all the notes 
    for(let i=0;i<allDataKeys.length;i++){

        var edjsData   = JSON.parse(allData[allDataKeys[i]]);
        var foo_loaded_keys   = Object.keys(edjsData['JSON']);
        var colorChosen = colorsNotes[Math.floor(Math.random()*colorsNotes.length)];
        
        var noteContent = document.createElement('div');
        noteContent.className = 'note-content';
        noteContent.id = 'note-content' + i;


        if(foo_loaded_keys.length>0){
            // Only insert div to page if there are notes
            document.getElementById('note-container').appendChild(noteContent);
        }


        for(let j=0;j<foo_loaded_keys.length;j++){


            var noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.style.backgroundColor = colorChosen;
            noteDiv.id = 'note' + note_count;

            var titleInput = document.createElement('div');
            titleInput.className = 'note-title';
            var titleCount = j+1;
            var tagsDiv = '';
            edjsData['TAGS'].split(",").forEach(function(item) {
                    var div = document.createElement('div');
                    div.textContent = item;
                    div.style.border = '1px solid #000';
                    div.style.padding = '10px';
                    div.style.margin = '5px';
                    div.style.display = 'inline-block';
                    div.style.backgroundColor = '#f0f0f0';
                    div.style.borderRadius = '20px'; // Rounded corners
                    div.style.color = '#800000'; // Maroon text color
                    div.style.fontFamily = 'Arial, sans-serif'; // Font family
                    div.style.fontSize = '14px'; // Font size
                    div.style.fontWeight = 'bold'; // Bold text
                    tagsDiv +=div.outerHTML;
                });
            var editedTime = new Date(edjsData['JSON'][foo_loaded_keys[j]]['time']).toString();

            titleInput.innerHTML = "<a href='" + 'https://' + allDataKeys[i] + "#tooltip"  + titleCount + "'>" +   edjsData['TITLE'] +  " &#128279;" + "</a><br>" + tagsDiv + "<br><i class='lastModified'>Last edited on:"+ editedTime  + "</i>";

            noteDiv.appendChild(titleInput);


            document.getElementById('note-content' + i).appendChild(noteDiv);

            var edjsnote = new EditorJS({
                holder: "note"+note_count,
                tools: {
                  header: {
                    class: Header,
                    inlineToolbar:true,
                    config: {
                    placeholder: 'Header'
                    },
                    shortcut: 'CMD+SHIFT+H'
                  },
                  image: SimpleImage,
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
                  },
                data:  edjsData['JSON'][foo_loaded_keys[j]],
                readOnly: true

              });
                note_count+=1;

        }
    }
}

var dataPacket = {};
fetch(`http://127.0.0.1:3000/getAll`,
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


// Search functionality/////
function searchDB(){
    var text = document.getElementById('search').value;
    document.getElementById('note-container').innerHTML = ''; // Clear the note container
    note_count = 0

    // $('.note-content').children('div').show();
    // $('.note-content').children('div:not(:contains(' + text + '))').hide();
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

document.getElementById('searchBtn').addEventListener('click', searchDB);

// setInterval(searchDB, 1000);

document.addEventListener('click', function(e) {
    // only toggle if display is not visible

    if(e.target.id == 'searchDiv' || e.target.id == 'search' || e.target.id == 'searchBtn'){
        return;
    }
    else{
       
        $("#display").toggle();
    
    }
    
    try{
        if(e.target.id.includes('note')){
            $("#display").html(e.target.innerHTML);
        }
        else{
            // check parent
            if(e.target.parentElement.id.includes('note')){
                $("#display").html(e.target.parentElement.innerHTML);
            }
            else{
                // check grandparent
                if(e.target.parentElement.parentElement.id.includes('note')){
                    $("#display").html(e.target.parentElement.parentElement.innerHTML);
                }
                else{
                    // check great grandparent
                    if(e.target.parentElement.parentElement.parentElement.id.includes('note')){
                        $("#display").html(e.target.parentElement.parentElement.parentElement.innerHTML);
                    }
                    else{}
                }
            }
        }   
    }
   catch(err){
       console.log(err);
   }

});