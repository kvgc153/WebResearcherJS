// Get the readability output of the current webpage 
function readabilityProcess(message) {
  console.log("Readability process completed");
  webpageReadability = message.response.textContent;
}
var dataPacketReadability = {};
dataPacketReadability['bodyHTML'] = document.body.outerHTML;
dataPacketReadability['url']      = window.location.href;
dataPacketReadability['title']    = document.title;

var webpageReadability = "";
let readableOutput = notifyBackgroundPage(
  greeting ="readability",
  data     = JSON.stringify(dataPacketReadability),
  respond  = readabilityProcess,
);


class Ask {
  static get toolbox() {
    return {
      title: 'Ask'
    };
  }
  constructor({ api }) {
    this.api = api;
    this.messages = [];

    // Grab the entire innertext of the current webpage
    this.messages.push({
      "role": "system",
      "content":  WBJSConfig['LLM']['systemPrompt'] + webpageReadability
    });
    this.test = "";
    this.getPreviousMessages();
  }

  async getPreviousMessages() {
    try {
      this.test = await this.api.saver.save();
      for (var i = 0; i < this.test.blocks.length; i++) {
        if(this.test.blocks[i].type == "image"){
          console.log("ignoring images");
        }
        else{
          try{
            var message = {
              "role":"assistant",
              "content": this.test.blocks[i].data.text
            }
            this.messages.push(message)
          } catch (error) {
            console.error('Error saving data:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  
  sendMessage(userInput, input){
    var message = {
      "role":"user",
      "content": userInput + WBJSConfig['LLM']['answerPrompt']
    }
    this.messages.push(message)
    $.notify("Sending message. Please wait.", "info");
    
    // Ask LLM running in the background to answer question 
    fetch(WBJSConfig['LLM']['endpoint'], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": WBJSConfig['LLM']['model'],
        "stream": false,
        "messages": this.messages,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        // Display response from llama running
        const response = document.createElement('div');
        const userBlock = document.createElement('div');
        userBlock.innerText = "User: " + userInput + "\n";
        response.append(userBlock);

        const responseBlock = document.createElement('div');
        responseBlock.innerHTML = data.message.content + "<br><br>";
        response.append(responseBlock); 

        var message = {
          "role":"assistant",
          "content": data.message.content
        }
        this.messages.push(message)

        this.api.blocks.insert('paragraph', {
          text: response.innerHTML
        });
        input.innerText = '';

        // We now need to move the input block to the bottom 
        var inputBlockID = this.api.blocks.getCurrentBlockIndex();
        this.api.blocks.move(
          inputBlockID,
          inputBlockID-1
        )
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  render() {
    const container = document.createElement('div');
    
    // Create input element
    const input = document.createElement('span');
    input.contentEditable  = true;
    input.style.display = 'inline-block';
    input.style.padding = '10px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';

    // input.style.minWidth = '200px';
    input.style.width = '80%';
    input.style.boxSizing = 'border-box';
    input.style.outline = 'none'; 

    // Append input to container
    container.appendChild(input);
    
    // Create a button to submit the input
    const button = document.createElement('button');
    button.innerText = 'Ask';
    button.style.padding = '10px 20px';
    button.className = "btnWBJS btnWBJS-layered-3d--purple";
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    container.appendChild(button);
    
    // Add event listener to capture input value
    button.addEventListener('click', () => {
      const userInput = input.innerText;
      this.sendMessage(userInput, input);      
    });
    
    return container;
  }

  save(blockContent) {
    return {
      text: blockContent.innerHTML
    };
  }
}