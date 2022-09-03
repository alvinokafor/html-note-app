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

//function to sort notes
function sortNotes (notesDB, filterBy) {
    if (filterBy === 'byEdited') {
        return notesDB.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (b.updatedAt > a.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (filterBy === 'byCreated') {
        return notesDB.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (b.createdAt > a.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (filterBy === 'alphabetical') {
        return notesDB.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return 'nothing'
    }
}

//function to render notes on the browser
function renderNotes (notesDB, filters) {

    notesDB = sortNotes(notesDB, filters.filterBy)

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

    noteEl.setAttribute('href', `edit.html#${note.id}`)
    removeBtn.textContent = 'X'
    noteEl.textContent = note.title
    return noteItem
}

