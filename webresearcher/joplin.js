var joplinTags = [];
async function joplin_query_notes_by_created(url) {

  var results = await fetch(url);
  var resultsJSON = await results.json();
  for(var i = 0; i < resultsJSON.items.length; i++){
    joplinTags.push(resultsJSON.items[i].title);
  }
}

joplin_query_notes_by_created(`http://localhost:${joplinPort}/tags?token=` + joplinToken +  "&fields=title");


function updateTags(){
  tagsWBJSInput = document.getElementById("tagsWBJS");
  document.getElementById("showTags").innerHTML = "";

  if(tagsWBJSInput.value.length > 0){
    let userTags = tagsWBJSInput.value.split(',');
    let searchingTags = userTags[userTags.length - 1];
    //search joplinTags for substring
    let joplinTagsFiltered = joplinTags.filter(tag => tag.includes(searchingTags));

    if(joplinTagsFiltered.length < joplinTags.length){
        //display filtered tags 
        for (let i = 0; i < joplinTagsFiltered.length; i++) {
          // Create a new div element
          var div = document.createElement("div");
      
          // Set the text content
          div.textContent = joplinTagsFiltered[i];
        
          // Apply styles
          div.contentEditable = "true";
          div.style.display = "inline-block";
          div.style.padding = "5px 10px"; // Smaller padding
          div.style.margin = "2px"; // Smaller margin
          div.style.borderRadius = "10px"; // Smaller border radius
          div.style.backgroundColor = "#f2f2f2";
          div.style.border = "1px solid #ddd";
          div.style.fontSize = "12px";
      
          document.getElementById("showTags").innerHTML +=  div.outerHTML;
      

    }


    }


  }
};

setInterval(function(){
  updateTags();
}, 3000);