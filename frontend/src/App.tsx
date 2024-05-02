import './App.css'
import React, { useEffect, useState } from 'react'
import EditIcon from './assets/edit.svg'
import DeleteIcon from './assets/delete.svg'
import axios from 'axios';
import Navbar from './components/Navbar';

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [updateNote, setUpdateNote] = useState<Note | null>(null);
  const [noteID, setNoteID] = useState<number | null>(null);

  useEffect(() => {
    // const fetchNotes = async () => {
    //   await axios.get('http://localhost:4000/api/notes').then((response) => {
    //     setNotes(response.data)
    //   }).catch((error) => {
    //     console.log(error);
    //   })
    // }
    // fetchNotes();
    setNotes([
      {
        id: 1,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 2,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 3,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 4,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 5,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 6,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 7,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 8,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 9,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 10,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 11,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 12,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 13,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 14,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 15,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 16,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 17,
        title: "Title 1",
        content: "content 1"
      },
      {
        id: 18,
        title: "Title 1",
        content: "content 1"
      },
    ])
  }, [])

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault()


    await axios.post('http://localhost:4000/api/notes', {
      title,
      content
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).catch((error) => {
      console.log(error);
    });

    await axios.get('http://localhost:4000/api/notes').then((response) => {
      setNotes(response.data)
    }).catch((error) => {
      console.log(error);
    });

    setTitle('');
    setContent('');

  }

  const handleEditNote = (event: React.FormEvent) => {
    setNoteID(Number(event.currentTarget.id));
    const note = notes.find((note) => note.id === noteID);
    if (note) {
      setUpdateNote(note);
      setTitle(note.title);
      setContent(note.content);
    }
  }

  const handleUpdateButton = async (event: React.FormEvent) => {

    event.preventDefault();

    await axios.put(`http://localhost:4000/api/notes/${noteID}`, {
      title,
      content
    },
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .catch((error) => console.log(error)
      );

    await axios.get('http://localhost:4000/api/notes')
      .then((response) => setNotes(response.data))
      .catch((error) => console.log(error))

    setTitle('');
    setContent('');
    setUpdateNote(null);
    setNoteID(null)
  }

  const handleCancelButton = () => {
    setTitle('');
    setContent('');
    setUpdateNote(null);
  }

  const handleClosebutton = async (event: React.FormEvent) => {

    event.preventDefault();
    const id = Number(event.currentTarget.id);

    await axios.delete(`http://localhost:4000/api/notes/${id}`).catch((error) => console.log(error));

    await axios.get('http://localhost:4000/api/notes')
      .then((response) => setNotes(response.data))
      .catch(error => console.log(error));
  }

  return (
    <div>
      <Navbar />
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
                <img id={`${note.id}`} src={DeleteIcon} alt="Edit Icon" onClick={handleClosebutton} />
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}


        </div>
      </div>
    </div>
  )
}

export default App