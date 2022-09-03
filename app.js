// 1. create an array of objects to store the notes
// 2. create a render function to render the notes to the browser from the array
// 3. create a filter logic to search through the notes
// 4. create logic for adding notes
// 5. store the notes to local storage

const notesDB = getSavedNotes()

const filters = {
    searchText: '',
    filterBy: 'byEdited'
}
//renders notes for the first time displaying all notes
renderNotes(notesDB, filters)

document.querySelector('#search-query').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notesDB, filters)
})



document.querySelector('#noteForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const id = uuidv4()
    const timeStamp = moment().valueOf()

    if (e.target.elements.addNote.value.length !== 0) {
        notesDB.push({
            id: id,
            title: e.target.elements.addNote.value,
            description: 'default description',
            createdAt: timeStamp,
            updatedAt: timeStamp
        })
    } else {
        notesDB.push({
            id: id,
            title: 'Unnamed Note',
            description: 'default description',
            createdAt: timeStamp,
            updatedAt: timeStamp
        })
    }

    saveNotes(notesDB)
    // renderNotes(notesDB, filters)
    location.assign(`edit.html#${id}`)
    e.target.elements.addNote.value = ''
})


document.querySelector('#sortNotes').addEventListener('change', function (e) {
    filters.filterBy = e.target.value
    renderNotes(notesDB, filters)
})

