//function to get saved notes from local storage
function getSavedNotes () {
    const noteJSON = localStorage.getItem('note')

    if (noteJSON !== null) {
        return JSON.parse(noteJSON)
    } else {
        return []
    }
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
    const noteItem = document.createElement('p')
    noteItem.textContent = note.title
    return noteItem
}

