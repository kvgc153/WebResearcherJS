function readabilityProcess(message) {
  console.log("Readability process completed");
  webpageReadability = message.response;
}

var dataPacket = {};
dataPacket['bodyHTML'] = document.body.outerHTML;
dataPacket['url'] = window.location.href;
dataPacket['title'] = document.title;

var webpageReadability = "";
// Get the readability of the current webpage 
let readableOutput = notifyBackgroundPage(
  greeting="readability",
  data = JSON.stringify(dataPacket),
  respond = readabilityProcess,
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
      "content":  "ALWAYS answer the following questions using the following text ONLY. Text : " + webpageReadability
    });


    this.test = "";
    this.getPreviousMessages();
  }

  async getPreviousMessages() {
    try {
      this.test = await this.api.saver.save();
      for (var i = 0; i < this.test.blocks.length; i++) {
        if(this.test.blocks[i].type == "image"){
          console.log("ignoring image");
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
      "content": userInput + ". Answer me only in HTML format and ONLY provide verbatim text from provided document as response. "
    }
    this.messages.push(message)
    $.notify("Sending message. Please wait.", "info");
    
    // Ask llama running in the background to answer question 
    fetch(LLMWBJSserver, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "llama3.2",
        "stream": false,
        "messages": this.messages,
        "options": {
          "temperature": 0
        }
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
  //   input.innerText = 'Ask a question';
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
    button.className = "btn btn-layered-3d--purple";
    // button.style.backgroundColor = '#4CAF50';
    // button.style.color = 'white';
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