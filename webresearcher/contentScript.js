function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  chrome.runtime.sendMessage({
    greeting: "Sending trigger to start extension"
  }, function(response) {
    if (chrome.runtime.lastError) {
      handleError(chrome.runtime.lastError);
    } else {
      handleResponse(response);
    }
  });
}

notifyBackgroundPage();
