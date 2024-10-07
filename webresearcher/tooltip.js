function makeButton(innerText, id){
  const button = document.createElement('button');
  button.innerText = innerText;
  button.style.zIndex = '1000';
  button.style.backgroundColor = 'blue';
  button.style.color = 'white';
  button.style.position = 'relative';
  button.id = id;  
  button.className = 'btn'; 
  return button
}

function makeTooltip(){
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltipWBJS';
    tooltip.className = 'tooltip';
    tooltip.style.display = 'none';
    
    const btn1 = makeButton(
      innerText = "Summarize",
      id = "summarizeWBJS"
    );
  
    const btn2 = makeButton(
      innerText = "Cite",
      id = "citeWBJS"
    )

    const wrapperDiv = document.createElement('div');
    wrapperDiv.appendChild(btn1);
    wrapperDiv.appendChild(btn2);
    wrapperDiv.style.width = '400px';
    wrapperDiv.style.display = 'flex';
    wrapperDiv.style.flexDirection = 'row';

    tooltip.appendChild(wrapperDiv);

    document.body.appendChild(tooltip);
}
makeTooltip();

// Function to show tooltip when text is selected
function showTooltip(event) {
  const selection = window.getSelection();
  let tooltip = document.getElementById('tooltipWBJS');


  if (selection.toString().length > 0) {

      // Check if the element that trigger it is a WBJS note and if so, igore the event
      // Why 7? Its arbitrary. 
      
      let element = event.target;
      for (let i = 0; i < 7; i++) {
        if (element.parentElement) {
          element = element.parentElement;
          if(element.id.includes("tooltip")){
            return;
          }
        } else {
          break;
        }
      }
      ////////////////////////////
     
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      userSeletedText = selection.toString();
      console.log(userSeletedText);   

      // basically move the tooltip to the selected text
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY}px`;
      tooltip.style.display = 'block';

  } 
  else {
      tooltip.style.display = 'none';
  }
}
document.addEventListener('mouseup', showTooltip);


// When the summarize button is clicked, summarize the selected text
let summarizeButton = document.getElementById('summarizeWBJS');
summarizeButton.addEventListener('click', function()  {
  // const question = document.getElementById('questionWBJS').value;  
  const context = window.getSelection().toString();
  
  // Call API to summarize the text
  fetch("http://localhost:11434/api/chat ", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "model": "llama3.2",
      "stream": false,
      "messages": [
          { 
            "role": "user",
"content": "Summarize the following in two sentences and give me tags in hashtag format to remember them later. The tags must be returned in the following template only where TAG is the tag:<a href='http://0.0.0.0:3000/notesViewer?q=TAG'>#TAG</a>. Print only the summary and tags in HTML format. Text:" + context          }
      ]

    }),
  }).then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // create a editorjs block
      responseBlock = {
        "time": 1629780000000,
        "id": "xxxxxxxxxxxxxx",
        "blocks": [
          {
          type: 'paragraph',
          data: {
            text: data.message.content
          }
        }
        ]
      };
      
      let w = new WBJS(noteID = note_count,data = responseBlock);
      w.createNote();
      note_count+=1; // update note counter

      // hide the tooltip
      let tooltip = document.getElementById('tooltipWBJS');
      tooltip.style.display = 'none';

      //toggle the WBJS sidebar
      $("#userButtonPanelWBJS").toggle();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  });



let citeButton = document.getElementById('citeWBJS');
citeButton.addEventListener('click', function()  {
  const context = window.getSelection();

  // Get the HTML of the selected text
  var selectedText = document.createElement("div");
  for (var i = 0, len = context.rangeCount; i < len; ++i) {
    selectedText.appendChild(context.getRangeAt(i).cloneContents());
  }

  responseBlock = {
    "time": 1629780000000,
    "id": "xxxxxxxxxxxxxx",
    "blocks": [
      {
      type: 'quote',
      data: {
        text: selectedText.innerHTML,
        caption: "",
        alignment: "left"
      }
    }
    ]
      };
      
  let w = new WBJS(noteID = note_count,data = responseBlock);
  w.createNote();
  note_count+=1; // update note counter

  // hide the tooltip
  let tooltip = document.getElementById('tooltipWBJS');
  tooltip.style.display = 'none';

  //toggle the WBJS sidebar
  $("#userButtonPanelWBJS").toggle();
});