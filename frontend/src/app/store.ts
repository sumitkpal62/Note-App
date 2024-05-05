import { configureStore } from '@reduxjs/toolkit'
import noteReducer from '../features/noteSlice'

export interface RootState {
  notes: ReturnType<typeof noteReducer>;
}

export const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
})

export type AppDispatch = typeof store.dispatch