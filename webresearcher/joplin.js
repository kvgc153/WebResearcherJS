var url = 'http://127.0.0.1:41184';

// Get the token from the storage
let token; 
var joplinToken = browser.storage.sync.get('joplinToken');
joplinToken.then((res) => {
  token = JSON.parse(res.joplinToken);
});

/** The following code block was adapted from Joplin dashboard by rami.sedhom@gmail.com **/
// Enable markdown-it
// var md = window.markdownit({
//   html: true,
//   linkify: true,
//   typographer: true,
//   breaks: true
// })
//   .use(window.markdownitFootnote);;
//* <div class="bg-secondary text-white">:/${md.render(note[i].body)}</div>  */}

function joplin_query_notes_by_created(token, css_id_selector, query) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      // Convert to JSON
      var jsonResponse = Object.values(JSON.parse(this.responseText)); // https://stackoverflow.com/questions/55458675/filter-is-not-a-function
      var note = jsonResponse[0];
      document.getElementById(css_id_selector).innerHTML = '<br>';
               
      for(var i=0;i<100;i++){
              
        document.getElementById(css_id_selector).innerHTML = document.getElementById(css_id_selector).innerHTML  + `
        <h4>${i+1}. 
           <a href="joplin://x-callback-url/openNote?id=${note[i].id}">${note[i].title} </a></h4>
           <div class="bg-info text-white" contenteditable="true">:/${note[i].id}</div> 
           <br><br>
        `;
      
      }

    }

  });
  // Request all notes from Joplin
  xhr.open('GET', url + '/search?token=' + token + '&query=' + query  + '*&type=note&fields=id,title,user_created_time,body');
  xhr.send();
};

function logTabs(tabs) {
  let tab = tabs[0]; // Safe to assume there will only be one result
  console.log(tab.url);
  document.getElementById('searchResults').innerHTML = '';
  const contentBox = document.querySelector("#content");
  contentBox.textContent = tab.url;  
  joplin_query_notes_by_created(token, 'searchResults', tab.url.split('://')[1]);

}
function handleActivated(activeInfo) {
  browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
}


browser.tabs.onActivated.addListener(handleActivated);
browser.tabs.onCreated.addListener(handleActivated);
browser.tabs.onUpdated.addListener(handleActivated);

/*
When the user mouses out, search Joplin
*/
window.addEventListener("mouseout", () => {
  contentBox.setAttribute("contenteditable", false);
  browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
    joplin_query_notes_by_created(token, 'searchResults', contentBox.textContent);
  });
});



window.addEventListener("mouseover", () => {
  const contentBox = document.querySelector("#content");
  contentBox.setAttribute("contenteditable", true);
});
/*
When the user mouses out, save the current contents of the box.
*/
window.addEventListener("mouseout", () => {
  
  const contentBox = document.querySelector("#content");
  contentBox.setAttribute("contenteditable", false);  
  joplin_query_notes_by_created(token, 'searchResults', contentBox.textContent);

});