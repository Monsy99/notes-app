import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    newNoteModal: false,
    loading: null,
    note: null,
    notes: null,
    error: null,
  },
  reducers: {
    toggleNewNoteModal: (state) => {
      state.newNoteModal = !state.newNoteModal;
    },
    fetchNote: (state) => {
      state.loading = true;
    },
    fetchNoteSuccess: (state, { payload }) => {
      state.note = payload.note;
      state.loading = false;
    },
    fetchError: (state) => {
      state.error = true;
    },
    fetchNotes: (state) => {
      state.loading = true;
    },
    fetchNotesSuccess: (state, { payload }) => {
      state.notes = payload.notes;
      state.loading = false;
    },
    fetchDeleteNoteSuccess: (state) => {
      // setting state.note to null to force reload of the new state
      state.note = null;
      state.loading = false;
    },
    fetchCreateNote: (state) => {
      state.loading = true;
    },
    fetchCreateNoteSuccess: (state, { payload }) => {
      state.note = payload.note;
      state.loading = false;
    },
    fetchDeletedNotes: (state) => {
      state.loading = true;
    },
    fetchAnyNote: (state) => {
      state.loading = true;
    },
    fetchDeleteNote: () => {},
    fetchUpdateNote: () => {},
  },
});
const selectNotesState = (state) => state.notes;
const selectNotes = (state) => selectNotesState(state).notes;
const selectNote = (state) => selectNotesState(state).note;
const selectError = (state) => selectNotesState(state).error;
const selectLoading = (state) => selectNotesState(state).loading;
const selectNewNoteModal = (state) => selectNotesState(state).newNoteModal;

export {
  selectError,
  selectNotesState,
  selectNotes,
  selectNote,
  selectLoading,
  selectNewNoteModal,
};

export const {
  fetchNote,
  fetchNoteSuccess,
  fetchNotes,
  fetchNotesSuccess,
  fetchDeleteNote,
  fetchDeleteNoteSuccess,
  fetchError,
  fetchCreateNote,
  fetchCreateNoteSuccess,
  toggleNewNoteModal,
  fetchUpdateNote,
  fetchDeletedNotes,
  fetchDeletedNotesSuccess,
  fetchAnyNote,
  fetchAnyNoteSuccess,
} = notesSlice.actions;

export default notesSlice.reducer;
