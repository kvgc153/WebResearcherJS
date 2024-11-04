function makeButton(innerHTML, id, title){
  const button = document.createElement('button');
  // button.innerText = innerText;
  button.innerHTML = innerHTML
  button.style.zIndex = '1000';
  button.title = title;
  button.style.position = 'relative';
  button.id = id;  

  button.style.backgroundColor = '#333'; // Dark grey color
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.padding = '10px 20px';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  button.style.fontSize = '16px';
  button.style.fontWeight = 'bold';
  button.style.transition = 'background-color 0.3s';

  // Add hover effect
  button.addEventListener('mouseover', function() {
    button.style.backgroundColor = '#111'; // Even darker shade
  });

  button.addEventListener('mouseout', function() {
    button.style.backgroundColor = '#333';
  });


  return button
}

function makeTooltip(){
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltipWBJS';
    tooltip.className = 'userButtonPanelWBJSToggler';
    tooltip.style.display = 'none';

    const btn1 = makeButton(
      // innerText = "Summarize",
      innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
  <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
  <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
</svg>`,
      id = "summarizeWBJS",
      title = "Summarize",
    );
  
    const btn2 = makeButton(
      // innerText = "Quote",
      innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
  <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/>
</svg>`,
      id = "citeWBJS",
      title = "Quote",
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
      for (let i = 0; i < 10; i++) {
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

      // basically move the tooltip to the selected text
      // tooltip.style.left = `${rect.left + window.scrollX}px`;
      // tooltip.style.top = `${rect.bottom + window.scrollY}px`;
      tooltip.style.top = rect.bottom  + 'px'; // 5px offset
      tooltip.style.left = rect.x  + 'px';     // 5px offset

      tooltip.style.display = 'block';
      tooltip.style.position = 'fixed';
      tooltip.style.zIndex = '1000';

  } 
  else {
      tooltip.style.display = 'none';
  }
}
document.addEventListener('mouseup', showTooltip);
document.addEventListener('keyup', showTooltip);
document.addEventListener('click', showTooltip);


// When the summarize button is clicked, summarize the selected text
let summarizeButton = document.getElementById('summarizeWBJS');
summarizeButton.addEventListener('click', function()  {
  // const question = document.getElementById('questionWBJS').value;  
  const context = window.getSelection().toString();

  $.notify("Summarizing the text. Please wait...", "info");
  
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
"content": "Summarize the following in two sentences and give me tags in hashtag format to remember them later. The tags must be returned in the following template only where TAG is the tag:<a href='http://127.0.0.1:3000/notesViewer?q=TAG'>#TAG</a>. Print only the summary and tags in HTML format. Text:" + context          }
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
      type: 'paragraph',
      data: {
        text: selectedText.innerHTML
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

});