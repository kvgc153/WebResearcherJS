
function makeTooltip(){
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltipWBJS';
    tooltip.className = 'tooltip';
    tooltip.style.display = 'none';


    // const input = document.createElement('input');
    // input.type = 'text';
    // input.id = 'questionWBJS';
    // input.value = 'Enter question here';
    // tooltip.appendChild(input);
  
    const button = document.createElement('button');
    button.innerText = 'Summarize';
    button.id = "summarizeWBJS";  
    button.className = 'btn';
    tooltip.appendChild(button);
  
    document.body.appendChild(tooltip);
  }
  makeTooltip();
  
  // Function to show tooltip when text is selected
  function showTooltip(event) {
    const selection = window.getSelection();
    let tooltip = document.getElementById('tooltipWBJS');
  
  
    if (selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        userSeletedText = selection.toString();
        console.log(userSeletedText);   
  
        // basically move the tooltip to the selected text
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY}px`;
        tooltip.style.display = 'block';
    } 
    // else {
    //     tooltip.style.display = 'none';
    // }
  }

  var userSeletedText = "";
  
  // Attach the event listener to detect when text selection ends
  document.addEventListener('mouseup', showTooltip);
  
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
              "content": "Summarize this in two sentences and give me tags in hashtag format to remember them later: " + context
            }
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
  
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    });
  