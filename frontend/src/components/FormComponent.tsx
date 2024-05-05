import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotes, content, fetchNotes, setContent, setTitle, title, updateNotes } from "../features/noteSlice";
import { Dispatch } from "@reduxjs/toolkit";

const FormComponent: React.FC = ({ setUpdateNote, setNoteID, updateNote, noteID }) => {

  const dispatch: Dispatch = useDispatch();
  const titleValue = useSelector(title);
  const contentValue = useSelector(content);

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await dispatch(addNotes({ title: titleValue, content: contentValue }));
      dispatch(fetchNotes())
    } catch (error) {
      console.log(error);
      // Handle error if needed
    }
    dispatch(setTitle(''));
    dispatch(setContent(''));
  }

  const handleUpdateButton = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateNotes({ id: noteID, title: titleValue, content: contentValue }));
    dispatch(fetchNotes())
    dispatch(setTitle(''));
    dispatch(setContent(''));
    setUpdateNote(null);
    setNoteID(null)
  }

  const handleCancelButton = () => {
    dispatch(setTitle(''));
    dispatch(setContent(''));
    setUpdateNote(null);
  }


  return (
    <form
      className="note-form"
      onSubmit={(event) => handleAddNote(event)}
    >
      <input
        type="text"
        placeholder="Title"
        value={titleValue}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        required
      />
      <textarea
        placeholder="Content"
        value={contentValue}
        onChange={(e) => dispatch(setContent(e.target.value))}
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
  )
}

export default FormComponent