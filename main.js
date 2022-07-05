
showNotes();
// adding eventlistners that will add the notes to localstorage

let addBtn = document.getElementById('addBtn');
// eventlistner
addBtn.addEventListener("click", function(e){
    let addNote = document.getElementById("addNote"); //collect the textarea content
    let notes = localStorage.getItem("notes"); // get the content of notes and put them into local storage in the array of notes

    // if notes is not declare in local storage then
    if(addNote.value.length == 0) {

        alert("Please write something in text box first!");

    }
    else{
        if(notes == null)
        {
            notesObj = [];
        }
        else
        {
            notesObj = JSON.parse(notes);
        }
         // take the value from textarea od id addnote push it into notesobject.
         notesObj.push(addNote.value);
         //set key notes in local storage and give an array in string format stored in notesobject
        localStorage.setItem("notes", JSON.stringify(notesObj)); 
        //null the value of text area after passing it to local storage
        addNote.value = "";
        console.log(notesObj);
        showNotes();
    }

   
    
});

// function of showing notes in HTML frm localstorage
function showNotes(){

    let notes = localStorage.getItem("notes"); // get the content of notes and put them into local storage in the array of notes

    // if notes is not declare in local storage then
    if(notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj = JSON.parse(notes);
    }

    let html ="";

    // foreach loop to show notes from notesobj by generating different html for each array element

    notesObj.forEach(function(element, index){

        html += ` <div class="card my-2 mx-2 noteCards notes" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text" id="showNotes">${element}</p>
            <button id = ${index} onclick = 'deleteNote(this.id)' class="btn btn-primary" id="deleteNote">Delete Note</button>
          </div>
      </div>`
    });

    let noteElement = document.getElementById('notes');
    if (notesObj.length != 0){

        noteElement.innerHTML = html;
    }
    else{

        noteElement.innerHTML = `Oops!! you haven't add any Note yet!!`; 
    }
    

}

// function to delete a note

function deleteNote(index)
{
    console.log(`deleted`, index);

    let notes = localStorage.getItem("notes"); // get the content of notes and put them into local storage in the array of notes

    // if notes is not declare in local storage then
    if(notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

// some js for search function

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function(){
    
    let searchVal = searchTxt.value.toLowerCase();
    // console.log(`fired`, searchVal);

    let noteCards = document.getElementsByClassName('noteCards');
    Array.from(noteCards).forEach(function(element)
    {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
       

        if(cardTxt.includes(searchVal))
        {
            element.style.display = "block";

        }
        else
     {
            element.style.display = "none";
        }
    })
})

/*
later on will add following features:
1. add title
2. mark a note as important
3. Separate notes by user
4. sync with server and host to webserver
5. edit notes
*/


