export default function Folders(props) {
    const folderElements = props.folders.map((folder, index) => (
        <div key={folder.id}>
            <div 
                className={`${
                    folder.id === props.currentFolderID ? "selected-folder" : "folder-elements"
                }`}
                onClick={() => props.setCurrentFolderID(folder.id)}
            >
                <img src="https://static.thenounproject.com/png/3218908-200.png" className="folder-symbol" alt="new"/>
                <h4 className="folder-display-name">{folder.name}</h4>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteFolder(event, folder.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="folder-sidebar">
            <div className="folder-sidebar-header">
                <h3>Folders</h3> 
                <button className="new-folder" onClick={props.newFolder}>+</button>
            </div>
            {folderElements}
        </section>
    )
}