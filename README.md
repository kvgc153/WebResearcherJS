## WebResearcherJS (WBJS) <img width="40px" src="logo.png">

Actively engage with webpages by annotating with WBJS sticky notes.


## Getting Started
- **WBJS Sticky Notes**: Download the WBJS Sticky Notes. Available on  [Firefox](https://addons.mozilla.org/en-US/firefox/addon/webresearcherjs/) and [Chrome (in beta)](https://chromewebstore.google.com/detail/webresearcherjs/gbddmghbmmnaioleipogfekanoahjeei?authuser=0&hl=en-GB). 

- **Local server**: All the notes taken on the browser using the extension will be saved to a server running locally. 

```shell 
git clone https://github.com/kvgc153/WebResearcherJS-extension.git
cd WebResearcherJS-extension/wbjs-server/
npm install
node server.js
```
A sqlite DB will be created in the same folder which will contain all the notes taken by the webclipper. Check that this exists in the folder before procedding further.


## How to take notes using WBJS?

<img width="100%" src="demo/demo_v801.gif">

1. **Create a Note:** Click on the 'Make Note' button to start a note.

2. **Move Note:** Drag the note around the page by holding down the left mouse button and moving your mouse.

3. **Add tags:** Add relevant tags to your note for easy organization.   
<img height="200px" src="demo/demo2.gif">

4. **Saving notes**: Save notes to server by pressing the save button. The notes will be automatically displayed the next time you visit the page.

5. **View all notes** : Visit http://127.0.0.1:3000/notesViewer to view and search all the notes taken.


<img width="100%" src="demo/homepage_WBJS.png">


The query string `q` can also be used to search the notes. 
Example usage: 
```
http://0.0.0.0:3000/notesViewer?q=test
```

Click [here](featuresAll.md) to learn about all the features of WBJS and [here](developerNotes.md) for developer notes.


 
# Buy me a Coffee :coffee:

If you like this project and would like to support this work, please consider [buying me a cup of coffee](https://buymeacoffee.com/509si1f).
