/// save Notes to localStorage when user clicks "save notes button" ///
function saveAllNotesWBJS(notify=true){
  // pack results into a dictionary
  let foo_final ={}
  foo_final['HTML'] = WBJS_HTML;
  foo_final['JSON'] = WBJS_JSON;
  foo_final['CSS']  = WBJS_CSS;
  foo_final['TAGS'] = document.getElementById('tagsWBJS').value;
  foo_final['TITLE'] = document.title || "";
  foo_final['URL'] = window.location.href;
  

  console.info("user asked to save data. Packed data below:")
  console.log(foo_final);

  // localStorage.setItem(webPageUrl, JSON.stringify(foo_final));
  if(notify){
    $.notify('Added notes to DB', "success");
  }
 // create note in localserver
 var dataPacket = {};
 dataPacket[webPageUrl] = JSON.stringify(foo_final);
 fetch(postServer,
 {
     body: JSON.stringify(dataPacket),
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },          
 }
 );
 
}
document.getElementById('saveNotesWBJS').addEventListener('click', saveAllNotesWBJS);

var interval = setInterval(function() {
  saveAllNotesWBJS(notify=false);
}, 10000);