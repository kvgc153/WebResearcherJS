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


        var noteContent1 = document.createElement('div');
        // var editedTime = new Date(edjsData['JSON'][foo_loaded_keys[0]]['time']).toString();
        noteContent1.innerHTML = "<h1>" + "<a href='" + 'http://' + allDataKeys[i] + "#tooltip"  + titleCount + "'>" + edjsData['TITLE'] + "</a></h1>" +  edjsData['TAGS'] + "<br>";



        if(foo_loaded_keys.length>0){
            // Only insert div to page if there are notes
            document.getElementById('note-container').appendChild(noteContent1);
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
            // edjsData['TAGS'].split(",").forEach(function(item) {
            //         var div = document.createElement('div');
            //         div.textContent = item;
            //         div.style.border = '1px solid #000';
            //         div.style.padding = '10px';
            //         div.style.margin = '5px';
            //         div.style.display = 'inline-block';
            //         div.style.backgroundColor = '#f0f0f0';
            //         div.style.borderRadius = '20px'; // Rounded corners
            //         div.style.color = '#800000'; // Maroon text color
            //         div.style.fontFamily = 'Arial, sans-serif'; // Font family
            //         div.style.fontSize = '14px'; // Font size
            //         div.style.fontWeight = 'bold'; // Bold text
            //         tagsDiv +=div.outerHTML;
            //     });
           
            var counter = j+1;

            // titleInput.innerHTML = "<a href='" + 'http://' + allDataKeys[i] + "#tooltip"  + titleCount + "'>" +   edjsData['TITLE'] +  " &#128279;" + "</a><br>" + tagsDiv + "<br><i class='lastModified'>Last edited on:"+ editedTime  + "</i>";
            titleInput.innerHTML = "<a href='" + 'http://' + allDataKeys[i] + "#tooltip"  + titleCount + "'>" +  'Note-' +counter +  " &#128279;" + "</a><br>" + tagsDiv + "<br>";

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
// Bind enter key to search
document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchDB();
    }
});

document.getElementById('searchBtn').addEventListener('click', searchDB);
document.getElementById('exporthBtn').addEventListener('click', () => {
    var exportData = document.getElementById('note-container').innerHTML;
    var exportData = `<!DOCTYPE html><html><head><title>Exported Notes</title></head>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
  
        .note-content {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            grid-gap: 0.3em;
            row-gap: 0.3em;
        }

        .note-display {
            width: 100%;
            height: 100%;
            background-color: #f4f4f4;
        }


        .note {
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            height:500px;
            overflow-y:scroll;
            background-color: #fff;
            transition: box-shadow 0.3s ease;
        }
        .note:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 1);
            /* cursor: pointer; */
            /* transform: scale(1.2,1.2); */
            /* z-index: 100; */
        }

        .note-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            width:100%;
        }
        .lastModified{
          font-size:13px;
        }
        button {
            margin-top: 20px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007BFF;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #0056b3;

        }
        .beautiful-button {
            font-size: 1em;
            padding: 10px;
            color: #fff;
            border: 2px solid #3498db;
            border-radius: 5px;
            background-color: #3498db;
            cursor: pointer;
            transition: all 0.15s;
        }

        .beautiful-button:hover {
            color: #3498db;
            background-color: #fff;

        }
        #search {
            width: 400px;
            height: 45px;
            border: 1px solid #dfe1e5;
            box-shadow: none;
            border-radius: 24px;
            padding: 0 20px;
            margin: 20px 0;
            font-size: 16px;
            outline: none;
        }

        #search:focus {
            box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
        }

        .display-div {
            position: fixed;
            font-size: larger;
            top: 0;
            left: 0;
            height: 10000px;
            width: 100%;
            z-index: 99;
            background-color: #f4f4f4;
            display: none;
            border: 2px solid #ccc;
            padding: 20px;
            margin: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: backdrop-filter 0.3s ease;
        }


    </style>
    
    <body>` + exportData ;
    var exportData = exportData  + `
    <script type="text/javascript" src= "ext_libs/jquery.min.js"></script>
    <script type="text/javascript" src= "ext_libs/jquery.sidebar.min.js"></script>
    <script type="text/javascript" src= "ext_libs/editorjs@latest.js"></script>
    <script type="text/javascript" src= "ext_libs/code@latest.js"></script>
    <script type="text/javascript" src= "ext_libs/edjsHTML.js"></script>
    <script type="text/javascript" src= "ext_libs/header@latest.js"></script>
    <script type="text/javascript" src= "ext_libs/list@latest.js"></script>
    <script type="text/javascript" src= "ext_libs/marker@latest.js"></script>
    <script type="text/javascript" src= "ext_libs/quote@latest.js"></script>
    <script type="text/javascript" src= "ext_libs/simple-image@latest.js"></script>
    <script type="text/javascript" src= "ext_libs/table@latest.js"></script>
    
    ` + "</body></html>";
    // save as html file
    var blob = new Blob([exportData], {type: "text/plain;charset=utf-8"});
    
    // Create a link element
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exportedNotes.html";
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Remove the link from the document
    document.body.removeChild(link);

});


// setInterval(searchDB, 1000);

// document.addEventListener('dblclick', function(e) {
//     // only toggle if display is not visible
//     console.log(e.target.id);
    
//     if(e.target.id == 'searchDiv' || e.target.id == 'search' || e.target.id == 'searchBtn'){
//         return;
//     }


//     else{
//         $("#display").toggle();
//         try{
//             if(e.target.id.includes('note')){
//                 $("#display").toggle();
//                 $("#display").html(e.target.innerHTML);
//             }
//             else{
//                 // check parent
//                 if(e.target.parentElement.id.includes('note')){
//                     $("#display").toggle();
//                     $("#display").html(e.target.parentElement.innerHTML);
//                 }
//                 else{
//                     // check parent's parent
//                     if(e.target.parentElement.parentElement.id.includes('note')){
//                         $("#display").toggle();
//                         $("#display").html(e.target.parentElement.parentElement.innerHTML);
//                     }
//                     else{return;}
//                 }
//             }   
//         }
//         catch(err){
//                 console.log(err);
//             }
//     }   
// });