import './App.css'
import React, { useState } from 'react'
import EditIcon from './assets/edit.svg'

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: 'Note 1', content: 'Note 1 Content' },
    { id: 2, title: 'Note 2', content: 'Note 2 Content' },
    { id: 3, title: 'Note 3', content: 'Note 3 Content' },
    { id: 4, title: 'Note 4', content: 'Note 4 Content' },
    { id: 5, title: 'Note 5', content: 'Note 5 Content' },
    { id: 6, title: 'Note 6', content: 'Note 6 Content' },
  ]);

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [updateNote, setUpdateNote] = useState<Note | null>(null);

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault()

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }
    setNotes([newNote, ...notes]);
    setTitle('')
    setContent('')
  }

  const handleEditNote = (event: React.FormEvent) => {
    const noteId = Number(event.currentTarget.id);
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      setUpdateNote(note);
      setTitle(note.title);
      setContent(note.content);
    }
    console.log(updateNote)
  }

  const handleUpdateButton = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updateNote?.id) {
        return {
          ...note,
          title: title,
          content: content
        }
      }
      return note;
    });
    setNotes(updatedNotes);
    setTitle('');
    setContent('');
    setUpdateNote(null);
  }

  const handleCancelButton = () => {
    setTitle('');
    setContent('');
    setUpdateNote(null);
  }

  const handleClosebutton = (event: React.FormEvent) => {
    const noteId = Number(event.currentTarget.id);
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    setNotes(filteredNotes);
  }

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) => handleAddNote(event)}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
        {
          updateNote ? (
            <div className='edit-note'>
              <button type="button" onClick={handleUpdateButton}>Update</button>
              <button type='button' onClick={handleCancelButton}>Cancel</button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )
        }

      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <img id={`${note.id}`} src={EditIcon} alt="Edit Icon" onClick={handleEditNote} />
              <button id={`${note.id}`} onClick={handleClosebutton}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}


      </div>
    </div>
  )
}

export default App