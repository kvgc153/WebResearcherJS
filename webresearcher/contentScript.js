function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  let sending = browser.runtime.sendMessage({
    greeting: "Sending trigger to start extension"
  });
  sending.then(handleResponse, handleError);
}


notifyBackgroundPage();
