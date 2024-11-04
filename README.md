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

<img width="100%" src="demo/demo1.gif">

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

Click [here](featuresAll.md) to learn about all the features of WBJS.

## Support for Llama3.2 (optional)

As of v8.0.0, WBJS offers the following features incorporating Meta's Llama 3.2 that the user can run locally using ollama (See [here](https://ollama.com/library/llama3.2) for instructions). The speed of the responses will depend on your available computing resources.


- **Summarize highlighted text :**

<img width="100%" src="demo/summarize.gif">

- **Continue having a conversation in the note** (For example, quiz yourself on your understanding). :

<img width="100%" src="demo/ask.gif">

All the text in the note will be used as context and sent to the mode

 
# Buy me a Coffee :coffee:

If you like this project and would like to support this work, please consider [buying me a cup of coffee](https://buymeacoffee.com/509si1f).


### Development

Checkout the notes posted [here](docs/docs.md) to understand how the extension code works and the notes posted [here](wbjs-server/README.md) to understand the server side implementation. Code, suggestions, and feedback are always welcome. 

### Inspiration

WBJS has been inspired by the following note taking projects:

- [TiddlyWiki](https://tiddlywiki.com/)
- [Joplin](https://joplinapp.org/)
- [Logseq](https://github.com/logseq/logseq)
- [Promnesia](https://github.com/karlicoss/promnesia)

WBJS uses the following packages and is thankful to its developers for its continued maintainence 

- [JQuery](https://jquery.com/)
- [EditorJS](https://editorjs.io/)
- [Express.js](https://expressjs.com/)
