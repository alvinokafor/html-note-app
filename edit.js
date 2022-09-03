const noteID = location.hash.substring(1)
const editNotes = getSavedNotes()

const noteTitle = document.querySelector('#editNote')
const noteDescription = document.querySelector('#noteBody')
const removeBtn = document.querySelector('#removeBtn')
const lastUpdated = document.querySelector('h4')


const notes = editNotes.find(function (note) {
    return note.id === noteID
})

if (notes === undefined) {
    location.assign('index.html')
}



noteTitle.value = notes.title
noteDescription.value = notes.description
lastUpdated.textContent = `Last Updated: ${moment(notes.updatedAt).fromNow()}`

noteTitle.addEventListener('input', function (e) {
   notes.title = e.target.value
   notes.updatedAt = moment().valueOf()
   lastUpdated.textContent = `Last Updated: ${moment(notes.updatedAt).fromNow()}`
   saveNotes(editNotes)
})

noteDescription.addEventListener('input', function (e) {
    notes.description = e.target.value
    notes.updatedAt = moment().valueOf()
    lastUpdated.textContent = `Last Updated: ${moment(notes.updatedAt).fromNow()}`
    saveNotes(editNotes)
 })

 removeBtn.addEventListener('click', function () {
    
    const noteIndex = editNotes.findIndex(function (note) {
        return note.id === noteID
    })

    if (noteIndex > -1) {
        editNotes.splice(noteIndex, 1)
    }

    location.assign('index.html')
    saveNotes(editNotes)
 })

 