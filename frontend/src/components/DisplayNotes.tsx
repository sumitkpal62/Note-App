import axios from "axios";
import EditIcon from '.././assets/edit.svg'
import DeleteIcon from '.././assets/delete.svg'
import Pin from '../assets/pin.png'
import { setContent, setTitle, selectNotes, deleteNote, fetchNotes, Note } from "../features/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

interface DisplayNotesProps {
  setUpdateNote: (note: Note | null) => void;
  setNoteID: (id: number | null) => void;
}


const DisplayNotes: React.FC<DisplayNotesProps> = ({ setUpdateNote, setNoteID }) => {
  const notes = useSelector(selectNotes);
  const dispatch: Dispatch = useDispatch();

  // Function to handle updation of note
  const handleEditNote = (noteId: number) => {
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      setNoteID(noteId);
      setUpdateNote(note);
      dispatch(setTitle(note.title));
      dispatch(setContent(note.content));
    }
  }

  // Function to handle deletion of a note
  const handleDeleteButton = async (noteId: number) => {
    try {
      await dispatch(deleteNote({ id: noteId }));
      dispatch(fetchNotes());
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <div className="notes-header">
            <img src={Pin} alt="note pin" />
            <div>
              <img id={`${note.id}`} src={EditIcon} alt="Edit Icon" onClick={() => handleEditNote(note.id)} />
              <img id={`${note.id}`} src={DeleteIcon} alt="Edit Icon" onClick={() => handleDeleteButton(note.id)} />
            </div>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  )
}

export default DisplayNotes