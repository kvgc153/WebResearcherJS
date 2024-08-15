function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
  return(message.response);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(greeting,data='',respond=handleResponse,error=handleError) {
  let sending = browser.runtime.sendMessage({
    greeting: greeting,
    data: data
  });
  sending.then(respond, error);
}


notifyBackgroundPage("trigger");
