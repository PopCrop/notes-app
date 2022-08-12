import React from 'react';   
import { nanoid } from 'nanoid';
import Split from 'react-split';
import Folders from "./Folders";
import Notes from "./Notes";
import Editor from "./Editor";
import './App.css';
import "react-mde/lib/styles/css/react-mde-all.css";

export default function App() {

  const [folders, setFolders] = React.useState([{name: "Folder 1", id: "starting_folder"}])

  const [currentFolderID, setCurrentFolderID] = React.useState(
    (folders[0] && folders[0].id) || ""
  )

  /*const [notes, setNotes] = React.useState(JSON.parse(localstorage.getItem("notes")) || [])*/

  const [notes, setNotes] = React.useState([])

  const [currentNoteID, setCurrentNoteID] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  /*React.useEffect(() => {
    localstorage.setItem("notes", JSON.stringify(notes))
  }, [notes])*/

  function newFolder() {
    const newFolder = {
      name: `Folder ${folders.length + 1}`,
      id: nanoid(),
    }
    setFolders(prevFolders => [newFolder, ...prevFolders])
    setCurrentFolderID(newFolder.id)
  }

  function deleteFolder(event, folderID) {
    event.stopPropagation()
    setFolders(oldFolders => oldFolders.filter(folder => folder.id !== folderID))
    deleteFolderNotes(folderID)
    console.log(notes.length)
  }

  /*function findCurrentFolder() {
    return folders.find(folder => {
      return folder.id === currentFolderID
    }) || folders[0]
  }*/

  function newNote() {
    const password = prompt('Enter a password for this note or click cancel if no password is desired.')
    const newNote = {
      name: `Note ${notes.length + 1}`,
      selected: true,
      id: nanoid(),
      folderID: currentFolderID,
      password: password,
      body: "Blank note",    
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteID(newNote.id)
    console.log(newNote.password)
  }

  function updateNote(text) {
    setNotes(oldNotes => {
      const newArray = []
      for(let i = 0; i < oldNotes.length; i++) {
          const oldNote = oldNotes[i]
          if(oldNote.id === currentNoteID) {
              newArray.unshift({ ...oldNote, body: text })
          } else {
              newArray.push(oldNote)
          }
      }
      return newArray
    })
  }

  /*function findCurrentNote() {
    return notes.find(note => {
        return note.id === currentNoteID
    }) || notes[0]
  }*/

  function deleteNote(event, noteID) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteID))
  }

  function deleteFolderNotes(folderID) {
    setNotes(oldNotes => oldNotes.filter(note => note.folderID !== folderID))
  }

  /*function togglePassword() {
    const newPassword = prompt("Enter the new password or leave blank if you would like to unencrypt the note.")
    for(let i = 0; i < notes.length; i++) {
      const note = notes[i]
      if(note.id === currentNoteID) {
        note.password = "" ? setNotes()  
      }
      
    }
  }*/

  function getStarted() {
    newNote()
  }

  return (
    <main>
    {
      notes.length > 0
      ?
      <Split
        sizes={[12, 13, 75]} 
        direction="horizontal" 
        className="split"
      >
        <Folders 
          folders={folders}
          currentFolderID={currentFolderID}
          setCurrentFolderID={setCurrentFolderID}
          newFolder={newFolder}
          deleteFolder={deleteFolder}
        />

        <Notes 
          notes = {notes}
          currentNoteID={currentNoteID}
          setCurrentNoteID={setCurrentNoteID}
          newNote={newNote}
          deleteNote={deleteNote}
          currentFolderID={currentFolderID}
        />
        {
          currentNoteID && 
          notes.length > 0 &&
          <Editor 
            /*currentNote={findCurrentNote()}*/
            updateNote={updateNote} 
          />
        }
              
      </Split>
      :
      <div className="no-notes">
          <h1>You have no notes</h1>
          <button 
              className="first-note" 
              onClick={getStarted}
          >
              Create one now
          </button>
      </div>
    }
    </main>
  )
}

