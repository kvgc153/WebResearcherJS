### Extension overview 
```mermaid
flowchart LR
    webpage[Webpage] --> load[Load notes from  locaStorage if any] 
   
    load --> Notes{{Take notes on webpage using this extension}}
    Notes  ---> |on button press| Export2[Save notes to Joplin]
    Notes  ---> |on button press| Export3[Save notes to localStorage]

    localStorage[(Local Storage)]
    localStorage -.- load
    localStorage -.- Export3

```

### Flowchart of source code

```mermaid
flowchart LR
bkgd[background.js] -->|injects| mods[Modules]
subgraph external modules
    jQuery -.- mods
    editor.js -.- mods
    mark.js -.- mods
    popper.js -.- mods
    notify.js -.- mods
end
subgraph webresearcherJS modules
    mods -.- init.js 
    mods -.- mouse[handleMouseEvents.js]
    subgraph Create notes 
        mods -.- webresearcher.js
    end 
    subgraph save/export/load
        mods -.- loadLocalStorage.js
        mods -.-  saveLocalStorage.js
        mods -.- export.js
    end
    subgraph css 
        mods -.- custom.css
    end
end

```


ext_libs/
> Contains all external libraries used in this extension

webresearcher/init.js
> Parameters controlling behavior of notes and highlights (e.g., color of note, fontsize, opacity, etc)

webresearcher/loadLocalStorage.js
> Checks if notes are available in localstorage and if so, loads them. autosave notes to localStorage every 15 seconds.

webresearcher/saveLocalStorage.js
> Save notes to localStorage when user clicks 'Save notes' button

webresearcher/export.js
> Export notes to Joplin.

webresearcher/webresearcher.js
> Core file containing class 'WBJS' which handles the creation of notes on the DOM when the user clicks Ctrl+1. 

webresearcher/custom.css
> css used for highlighting text on DOM
