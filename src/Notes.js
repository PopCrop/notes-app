export default function Notes(props) {
    function getPasswordInput() {
        const input = prompt('Enter the password for this encrypted note')
        return input
      }

    /* pass in function to getPasswordInput*/
    const noteElements = props.notes.map((note, index) => (
        note.folderID === props.currentFolderID ? 
            note.password === "" || null ?
                <div key={note.id}>
                    <div 
                        className={`${
                        note.id === props.currentNoteID ? "selected-note" : "note-elements"
                        }`}
                        onClick={() => props.setCurrentNoteID(note.id)}
                    >
                        <h4 className="note-display-name">{note.name}</h4>
                        <button 
                            className="delete-btn"
                            onClick={(event) => props.deleteNote(event, note.id)}
                        >
                            <i className="gg-trash trash-icon"></i>
                        </button>
                    </div>
                </div>
            :
                <div key={note.id}>
                    <div 
                        className={`${
                        note.id === props.currentNoteID ? "selected-note" : "note-elements"
                        }`}
                        onClick={() => {
                            const input = getPasswordInput()
                            input === note.password ? props.setCurrentNoteID(note.id) : alert("The password was incorrect, please try again.")}}
                    >
                        <h4 className="note-display-name">{note.name}</h4>
                        <button 
                            className="delete-btn"
                        >
                            <i className="gg-trash trash-icon"></i>
                        </button>
                    </div>
                </div> 
        :
            ""

    ))
    
    return (
        <section className="notes-sidebar">
            <div className="notes-sidebar-header">
                <h3>Notes</h3> 
                <button className="notes-folder" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}