// content-script.js

function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  let sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
  sending.then(handleResponse, handleError);
}

// window.addEventListener("click", notifyBackgroundPage);

window.onload = function() {
  notifyBackgroundPage();
};
