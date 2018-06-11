

//handles what is show in mainContent div
function showContent(type) {

      switch(type) {

            case "newNote":
                  document.getElementById("editNoteForm").style.display = "none";
                  document.getElementById("noteViewer").style.display = "none";
                  document.getElementById("newNoteForm").style.display = "block";
            break;

            case "allNotes":
                  document.getElementById("editNoteForm").style.display = "none";
                  document.getElementById("newNoteForm").style.display = "none";
                  document.getElementById("noteViewer").style.display = "flex";
            break;

            case "editNote":
                  document.getElementById("noteViewer").style.display = "none";
                  document.getElementById("newNoteForm").style.display = "none";
                  document.getElementById("editNoteForm").style.display = "block";

      };
};

//shows all saved notes
function showAllNotes() {

      showContent("allNotes");
      
      document.getElementById("noteViewer").innerHTML = "";

      let allNotes = window.localStorage;
      for (let note in allNotes) {

            if (note.includes("stickynote")) {

                  parsedNote = JSON.parse(localStorage.getItem(note));
                  let newNote = document.createElement("div");
                        newNote.className = "note";
                        newNote.id = note.substring(10);
                        newNote.innerHTML = "<h1>" + parsedNote["title"] + "</h1><br><h2>" + parsedNote["text"] + "</h2>";
                        newNote.addEventListener("click", focusNote);
                        document.getElementById("noteViewer").appendChild(newNote);
            };
      };
};

//shows searched notes
function searchAllNotes() {

      showContent("allNotes");
      
      document.getElementById("noteViewer").innerHTML = "";

      let search = document.getElementById("searchInput").value.toLowerCase();
      let allNotes = window.localStorage;
      for (let note in allNotes) {

            parsedNote = JSON.parse(localStorage.getItem(note));
            lowerParsedNoteTitle = parsedNote["title"].toLowerCase();

            if (note.includes("stickynote") && lowerParsedNoteTitle.includes(search)) {

                  let newNote = document.createElement("div");

                  newNote.className = "note";
                  newNote.id = note.substring(10);
                  newNote.innerHTML = "<h1>" + parsedNote["title"] + "</h1><br><h2>" + parsedNote["text"] + "</h2>";
                  newNote.addEventListener("click", focusNote);
                  document.getElementById("noteViewer").appendChild(newNote);

            };
      };
};

//shows the new note form
function showNewNote() {

      showContent("newNote");
};

//saves the new note into local storage
function createNewNote() {

      let currentDate = new Date();

      let newNoteTitle = document.getElementById("newNoteTitle").value;
      let newNoteText = document.getElementById("newNoteText").value;

      //note data saved as object for added capability, otherwise will have to save as key-value pairs
      let newNoteBody = {
            "title": newNoteTitle,
            "text": newNoteText,
            "date": currentDate
      };

      let noteID = "stickynote" + Date.parse(currentDate);

      localStorage.setItem(noteID, JSON.stringify(newNoteBody));
};

//focus on clicked note
function focusNote(event) {
      
      document.getElementById("noteViewer").innerHTML = "";
      
      let noteID = ""

      if (event.target["className"] === "note") {

            noteID = event.target["id"];
      } else {

            noteID = event.target.parentNode.id;
      };

      let noteTitle = "";
      let noteText = "";
      let allNotes = window.localStorage;
      for (let note in allNotes) {

            if (note.includes("stickynote") && note.includes(noteID)) {

                  parsedNote = JSON.parse(localStorage.getItem(note));
                  noteTitle = parsedNote["title"];
                  noteText = parsedNote["text"];
            };
      };

      document.getElementById("editNoteForm").setAttribute("data-noteID", noteID);
      document.getElementById("editNoteTitle").value = noteTitle; 
      document.getElementById("editNoteText").value = noteText;

      showContent("editNote");
};

//edit note
function editNote() {
     
      let noteID = document.getElementById("editNoteForm").getAttribute("data-noteID");
      let noteTitle = document.getElementById("editNoteTitle").value; 
      let noteText = document.getElementById("editNoteText").value;
      let newNoteBody = {
            "title": noteTitle,
            "text": noteText,
            "date": noteID
      };

      localStorage["stickynote" + noteID] = JSON.stringify(newNoteBody);
};

function deleteNote() {
      
      let deleteConfirmation = confirm("Are you sure you want to delete this note?");
      let noteID = document.getElementById("editNoteForm").getAttribute("data-noteID");
      if (deleteConfirmation === true) {

            localStorage.removeItem("stickynote" + noteID);
      };
};



//Ensures JS runs after all html elements are loaded
window.onload = function() {

      showAllNotes();

      document.getElementById("showNewNote").addEventListener("click", showNewNote);
      document.getElementById("createNewNote").addEventListener("click", createNewNote);
      document.getElementById("showAllNotes").addEventListener("click", showAllNotes);
      document.getElementById("searchAllNotes").addEventListener("keyup", searchAllNotes);
      document.getElementById("editNote").addEventListener("click", editNote);
      document.getElementById("deleteNote").addEventListener("click", deleteNote);
};