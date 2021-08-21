//variables
const noteList = document.querySelector("#note-list");




//eventlisteners
eventlisteners();

function eventlisteners() {
    //form submission
    document.querySelector("#form").addEventListener("submit" , newNote);

    //remove note from noteList
    document.querySelector("#note-list").addEventListener("click" , removeNote);

    //getiind data from localStorage on loaded
    document.addEventListener("DOMContentLoaded" , localStorageOnLoaded);
}



//functions
//adding new note to the list
function newNote(e) {
    e.preventDefault();

    const note = document.querySelector("#note").value

    //create li tag
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(note));

    //create remove btn
    const removeBtn = document.createElement("a");
    removeBtn.textContent = "X"
    removeBtn.classList = "remove-note"

    //adding removeBtn to the li tag
    li.appendChild(removeBtn)

    //adding li tag to the noteList
    noteList.appendChild(li)
    this.reset()

    //adding note to localStorage

    addNoteToLocalStorage(note);

    alert("This note add succesfully")

}

//remove note from noteList
function removeNote(e) {
    if (e.target.classList.contains("remove-note")){
        e.target.parentElement.remove()
    }
    //also remove note from localStorage
    removeNoteFromLocalStorage(e.target.parentElement.textContent)
}

//adding note to localStorage
function addNoteToLocalStorage(note) {
    //getting notes from localStorage
    const notes =getNotesFromLocalStorage();
    //adding new note to the notesAraay
    notes.push(note)
    //adding notesAraay to localStorage
    localStorage.setItem("notes" ,JSON.stringify(notes))

}

//getting note from localStorage
function getNotesFromLocalStorage() {
   let notes;
   //getting previose notes from localstorage
   const notesFromLS = localStorage.getItem("notes")
    if (notesFromLS === null){
        //if not exist create empty array
       notes = [];
   }else {
        //if exist convert to array
       notes = JSON.parse(notesFromLS);
   }
   return notes;
}

//getting data from localStorage onLoaded
function localStorageOnLoaded() {
    const notes =getNotesFromLocalStorage();

    notes.forEach(function (note) {
        //create li tag
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(note));

        //create remove btn
        const removeBtn = document.createElement("a");
        removeBtn.textContent = "X"
        removeBtn.classList = "remove-note"

        //adding removeBtn to the li tag
        li.appendChild(removeBtn)

        //adding li tag to the noteList
        noteList.appendChild(li)

    })
}

//also remove note from localStorage
function removeNoteFromLocalStorage(noteContent) {
    //get note from localStorage
    const notes =getNotesFromLocalStorage();
    //remove X from the content
    const noteDelete = noteContent.substring(0 , noteContent.length-1);

    notes.forEach(function (note ,index) {
        if (noteDelete === note){
            notes.splice(index , 1)
        }
    });
    localStorage.setItem("notes" , JSON.stringify(notes));
}
