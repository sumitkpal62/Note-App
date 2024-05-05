import './App.css'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import FormComponent from './components/FormComponent';
import DisplayNotes from './components/DisplayNotes';
import { useDispatch } from 'react-redux';
import { fetchNotes } from './features/noteSlice';

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [updateNote, setUpdateNote] = useState<Note | null>(null);
  const [noteID, setNoteID] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch])


  return (
    <div>
      <Navbar />
      <div className="app-container">
        <FormComponent
          setUpdateNote={setUpdateNote}
          updateNote={updateNote}
          setNoteID={setNoteID}
          noteID={noteID}
        />
        <DisplayNotes
          updateNote={updateNote}
          setUpdateNote={setUpdateNote}
          setNoteID={setNoteID}
          noteID={noteID}
        />
      </div>
    </div>
  )
}

export default App