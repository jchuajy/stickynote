
//handles what is show in mainContent div
function showContent(type) {

      switch(type) {

            case "newNote":
                  document.getElementById("noteViewer").style.display = "none";
                  document.getElementById("newNoteForm").style.display = "block";
            break;

            case "allNotes":
                  document.getElementById("newNoteForm").style.display = "none";
                  document.getElementById("noteViewer").style.display = "flex";
            break;

      };
};

//shows all saved notes
function showAllNotes() {

      showContent("allNotes");
      
      document.getElementById("noteViewer").innerHTML = "";

      let noteHTML = "";
      let allNotes = window.localStorage;
      for (let note in allNotes) {

            if (note.includes("stickynote")) {

                  parsedNote = JSON.parse(localStorage.getItem(note));
                  noteHTML = "<div class='note'><h1>" + parsedNote["title"] + "<h1><br>" + "<h2>" + parsedNote["text"] + "</h2></div>" + noteHTML;
            };
      };

      document.getElementById("noteViewer").innerHTML = noteHTML;
};

//shows searched notes
function searchAllNotes() {

      showContent("allNotes");
      
      document.getElementById("noteViewer").innerHTML = "";

      let search = document.getElementById("searchInput").value
      let noteHTML = "";
      let allNotes = window.localStorage;
      for (let note in allNotes) {

            if (note.includes("stickynote")) {

                  parsedNote = JSON.parse(localStorage.getItem(note));

                  if (parsedNote["title"].includes(search)) {

                        noteHTML = "<div class='note'><h1>" + parsedNote["title"] + "<h1><br>" + "<h2>" + parsedNote["text"] + "</h2></div>" + noteHTML;
                  };
            };
      };

      document.getElementById("noteViewer").innerHTML = noteHTML;
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


//shows the new note form
function showNewNote() {

      showContent("newNote");
};


//Ensures JS runs after all html elements are loaded
window.onload = function() {


      document.getElementById("showNewNote").addEventListener("click", showNewNote);
      document.getElementById("createNewNote").addEventListener("click", createNewNote);
      document.getElementById("showAllNotes").addEventListener("click", showAllNotes);
      document.getElementById("searchAllNotes").addEventListener("click", searchAllNotes);
};