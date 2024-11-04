class Ask {
  static get toolbox() {
    return {
      title: 'Ask'
    };
  }
  constructor({ data, api }) {
    this.api = api;
    this.messages = [];
  }
  sendMessage(userInput, input){
    var message = {
      "role":"user",
      "content": userInput 
    }
    this.messages.push(message)
    
    // Ask llama running in the background to answer question 
    fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "llama3.2",
        "stream": false,
        "messages": this.messages 

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

        this.api.saver.save().then((savedData) => {
          console.log(savedData);
        });

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