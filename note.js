console.log('this is Notes project')
showNotes();
// localStorage.clear()

// if user add note, add it to the localStorage
let addBtn = document.getElementById('addBtn'); // targeting button
addBtn.addEventListener('click', function(e) { // adding event listner in the button

        let addTxt = document.getElementById('addTxt') //targeting textarea
        let addTitle = document.getElementById('addTitle') //targeting title
            // console.log(addTxt)
        let notes = localStorage.getItem('item') // variable notes means the key(item) values of local storage

        let notesObj;
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes); //  parse will convert the string values into a array values
        }
        let myObj = {
            title: addTitle.value,
            text: addTxt.value
        }
        notesObj.push(myObj);
        localStorage.setItem('item', JSON.stringify(notesObj)); // it will convert the array(notesObj) into a string and added 
        // inside the local stroge with value item
        addTxt.value = ''
        addTitle.value = ''
        console.log(notesObj)

        //calling function shownotes shownotes
        showNotes();
    })
    // showNotes() function
function showNotes(e) {
    let notes = localStorage.getItem('item') // it will get the value of item from the local stroage
    let notesObj;
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes); //  parse will convert the string values into a array values
    }
    let html = '';
    notesObj.forEach(function(element, index) {
            html += `      <div class="card mx-2 my-2 noteCard" style="width: 18rem;">
      <div class="card-body ">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <button  id ='${index}' onclick='deleteNote(this.id)'  class="btn btn-primary">Delete Note</button>
      </div>
    </div>`
        })
        // here dleteNote(this.id): this.id means the id of the that element

    let notesElm = document.getElementById('Notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    } else {
        notesElm.innerHTML = `Nothing to show! here`
    }
}

// Delete Functionality 
function deleteNote(x) { // here x means the (this.id) or id of the element
    console.log('I am deleting', x);

    let notes = localStorage.getItem('item') // it will get the value of item from the local stroage
    let notesObj;
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes); //  parse will convert the string values into a array values
    }

    notesObj.splice(x, 1); // it will delete the note from the array only 
    localStorage.setItem('item', JSON.stringify(notesObj)) // so we will add the notesObj. value again in the localstorage
    showNotes();
}

// search funtionality
let search = document.getElementById('searchTxt');
search.addEventListener('input', function() {
    let inputVal = search.value.toUpperCase();
    console.log('Input event fired', inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName('h5')[0];
        Content = cardTxt.textContent.toUpperCase();
        // console.log(cardTxt);
        if (Content.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })
})