// 1. create an array of objects to store the notes
// 2. create a render function to render the notes to the browser from the array
// 3. create a filter logic to search through the notes
// 4. create logic for adding notes
// 5. store the notes to local storage

const notesDB = getSavedNotes()

const filters = {
    searchText: '',
    sortCheck: false
}

//renders notes for the first time displaying all notes
renderNotes(notesDB, filters)

document.querySelector('#search-query').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notesDB, filters)
})

document.querySelector('#noteForm').addEventListener('submit', function (e) {
    e.preventDefault()

    if (e.target.elements.addNote.value.length !== 0) {
        notesDB.push({
            title: e.target.elements.addNote.value,
            description: 'default description'
        })
    } else {
        notesDB.push({
            title: 'Unnamed Note',
            description: 'default description'
        })
    }

    localStorage.setItem('note', JSON.stringify(notesDB))
  
    renderNotes(notesDB, filters)
})

// document.querySelector('#sortNotes').addEventListener('change', function(e) {
//     filters.sortCheck = e.target.checked

//     if (filters.sortCheck) {
//         notesDB.sort(function (a, b) {
//             if (a.title.toLowerCase() < b.title.toLowerCase()) {
//                 return -1
//             } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
//                 return 1
//             } else {
//                 return true
//             }
//         } )
//     } 

//     renderNotes(notesDB, filters)
    
// })
