var joplinToken = '';

// function handleResponse(message) {
//   console.log(`Message from the background script:  ${message.response}`);
//   joplinToken = message.response;
// }

// function handleError(error) {
//   console.log(`Error: ${error}`);
// }

// async function notifyBackgroundPage(e) {
//   try {
//     let response = await chrome.runtime.sendMessage({
//       greeting: "Sending trigger to start extension"
//     });
//     console.log(JSON.stringify(response));
//     handleResponse(response);
//   } catch (error) {
//     handleError(error);
//   }
// }

// notifyBackgroundPage();

(async () => {
  const response = await chrome.runtime.sendMessage({greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response.response);
  joplinToken = response.response;
  console.log(joplinToken);
})();