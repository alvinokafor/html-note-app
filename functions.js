//function to get saved notes from local storage
function getSavedNotes () {
    const noteJSON = localStorage.getItem('note')

    if (noteJSON !== null) {
        return JSON.parse(noteJSON)
    } else {
        return []
    }
}

//function to save notes
function saveNotes (notesDB) {
    localStorage.setItem('note', JSON.stringify(notesDB))
}

//function to remove notes
function removeNotes (noteID) {
    const noteIndex = notesDB.findIndex(function (note) {
        console.log(noteID)
        return note.id === noteID
    })

    if (noteIndex > -1) {
        notesDB.splice(noteIndex, 1)
    }

    console.log(noteIndex)
}

//function to render notes on the browser
function renderNotes (notesDB, filters) {
    const filteredNotes = notesDB.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        document.querySelector('#notes').appendChild(generateDOM(note))
    })

}

//function to generate note elements for the DOM
function generateDOM (note) {
    const noteItem = document.createElement('div')
    const removeBtn = document.createElement('button')
    const noteEl = document.createElement('a')

    noteItem.appendChild(removeBtn)
    noteItem.appendChild(noteEl)

    //event listener for removing notes
    removeBtn.addEventListener('click', function () {
        removeNotes(note.id)
        saveNotes(notesDB)
        renderNotes(notesDB, filters)
    })

    noteEl.setAttribute('href', 'edit.html')
    removeBtn.textContent = 'X'
    noteEl.textContent = note.title
    return noteItem
}

