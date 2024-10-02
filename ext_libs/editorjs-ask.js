   class Ask {
    static get toolbox() {
      return {
        title: 'Ask'
      };
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
      input.style.minWidth = '200px';
      input.style.boxSizing = 'border-box';
      input.style.outline = 'none'; 

      // Append input to container
      container.appendChild(input);
      
      // Create a button to submit the input
      const button = document.createElement('button');
      button.innerText = 'Ask';
      button.style.padding = '10px 20px';
      // button.style.backgroundColor = '#4CAF50';
      // button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '4px';
      button.style.cursor = 'pointer';
      container.appendChild(button);
      
      // Add event listener to capture input value
      button.addEventListener('click', () => {
        const userInput = input.innerText;
        console.log('User input:', userInput);
        
        // Ask llama running in the background to answer question 
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
                  "content": userInput 
                }
            ]

          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            // Display response from llama running
            const response = document.createElement('div');
            response.innerHTML = data.message.content;
            // Add a filler horizontal line
            response.innerText += '\n' + '--- End of Response ---\n';
            // Lets appedn the response to the container
            container.appendChild(response);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      
      });
      
      return container;
   }

    save(blockContent) {
      return {
        text: blockContent.innerHTML
      };
    }
  }