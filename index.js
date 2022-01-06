let addBtn = document.getElementById("addButton");
let addTitle = document.getElementById("notesTitle");
let addNotes = document.getElementById("noteDetails");


addBtn.addEventListener("click", (e) => {
  if (addTitle.value == "" || addNotes.value == "") {
    return alert("Please add Note Title and Note Details");
  }

  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addNotes.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addNotes.value = "";
  showNotes();
});

const showNotes = () => {
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div id="noteDiv" class="card-body note">
        <h6 class="card-subtitle mb-2 text-muted">Note ${index + 1}</h6>
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <button href="#" id=${index} onclick="deleteNote(this.id)" class="btn btn-sm btn-warning">Delete Note</button>
        <button href="#" id=${index} onclick="editNote(this.id)" class="btn btn-sm btn-warning" >Edit Note</button>
    </div>
        `;
  });

  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = "No Notes Yet!! Add a note using the form above";
  }
};

const deleteNote = (index) => {
  let confirmDelete = confirm("Are you sure!!!!");
  if (confirmDelete == true) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
};

const editNote = (index) => {
  let notes = localStorage.getItem("notes");
  if (addTitle.value !== "" || addNotes.value !== "") {
    return alert("Please clear the form before editing a note");
  }
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.findIndex((element, index) =>{
    addTitle.value = element.title;
    addNotes.value = element.text;
  });
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}

showNotes();
