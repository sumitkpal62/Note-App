import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";

export interface Note {
  id: number,
  title: string,
  content: string,
}

export interface NoteState {
  title: string,
  content: string,
  notes: Note[],
}

const initialState: NoteState = {
  title: '',
  content: '',
  notes: []
}

export interface AddNotePayload {
  title: string;
  content: string;
}

export const fetchNotes = createAsyncThunk<Note[]>("note/fetchNotes", async () => {
  const response = await axios.get<Note[]>("http://localhost:4000/api/notes");
  return response.data;
});

export const addNotes = createAsyncThunk("note/addNotes", async (payload: AddNotePayload) => {
  const { title, content } = payload;
  await axios.post<Note>('http://localhost:4000/api/notes', {
    title,
    content
  },{
    headers: {
      "Content-Type": "application/json"
    }
  }).catch((error) => {
    console.log(error);
  })
})

export const updateNotes = createAsyncThunk(
  'note/updateNote',
  async (payload: Note) => {
    const { id, title, content } = payload;
    await axios.put<Note>(`http://localhost:4000/api/notes/${id}`, {
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
  }
)

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async (payload: Note) => {
    const { id } = payload;
    await axios.delete<Note>(`http://localhost:4000/api/notes/${id}`).catch((error) => console.log(error));
  }
)

export const noteSlice = createSlice({
  name: 'note',
  initialState: initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload
    })
  }
})

export const selectNotes = (state: RootState) => state.notes.notes;
export const title = (state: RootState) => state.notes.title;
export const content = (state: RootState) => state.notes.content;

export const { setTitle, setContent } = noteSlice.actions;

export default noteSlice.reducer;