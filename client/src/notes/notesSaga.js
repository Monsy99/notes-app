import { takeLatest, call, put } from "redux-saga/effects";
import {
  getNotes,
  getNote,
  deleteNote,
  createNote,
  updateNote,
  getDeletedNotes,
  getAnyNote,
} from "./api";

import {
  fetchError,
  fetchNote,
  fetchNotes,
  fetchDeleteNote,
  fetchCreateNote,
  fetchUpdateNote,
  fetchDeletedNotes,
  fetchNotesSuccess,
  fetchNoteSuccess,
  fetchDeleteNoteSuccess,
  fetchAnyNote,
} from "./notesSlice";

function* fetchNotesHandler() {
  try {
    const notes = yield call(getNotes);
    if (!notes) {
      throw new Error("Notes empty");
    }
    yield put(fetchNotesSuccess({ notes }));
  } catch (error) {
    yield put(fetchError());
  }
}
function* fetchNoteHandler({ payload }) {
  try {
    const note = yield call(getNote, { id: payload });
    if (!note) {
      throw new Error("Note not found");
    }
    yield put(fetchNoteSuccess({ note: note }));
  } catch (error) {
    yield put(fetchError());
  }
}
function* deleteNoteHandler({ payload }) {
  try {
    const response = yield call(deleteNote, { id: payload.id });
    if (!response.success) {
      throw new Error("There was a problem with deleting the note");
    }
    yield put(fetchDeleteNoteSuccess());
  } catch (error) {
    yield put(fetchError());
  }
}
function* createNoteHandler({ payload }) {
  try {
    const response = yield call(createNote, {
      title: payload.title,
      content: payload.content,
    });
    if (!response.success) {
      throw new Error("There was a problem with creating a note");
    }
  } catch (error) {
    yield put(fetchError());
  }
}
function* fetchUpdateNoteHandler({ payload }) {
  try {
    const response = yield call(updateNote, {
      id: payload.id,
      note: { title: payload.title, content: payload.content },
    });
    if (!response.success) {
      throw new Error("There was an issue with updating a note");
    }
  } catch (error) {
    yield put(fetchError());
  }
}
function* fetchDeletedNotesHandler() {
  try {
    const notes = yield call(getDeletedNotes);
    if (!notes) {
      throw new Error("No notes found");
    }
    yield put(fetchNotesSuccess({ notes }));
  } catch (error) {
    yield put(fetchError());
  }
}
function* fetchAnyNoteHandler({ payload }) {
  try {
    const note = yield call(getAnyNote, { id: payload });
    if (!note) {
      throw new Error("Bad request");
    }
    yield put(fetchNoteSuccess({ note: note }));
  } catch (error) {
    yield put(fetchError());
  }
}

export function* watchFetchNotes() {
  yield takeLatest(fetchDeleteNote.type, deleteNoteHandler);
  yield takeLatest(fetchNotes.type, fetchNotesHandler);
  yield takeLatest(fetchNote.type, fetchNoteHandler);
  yield takeLatest(fetchCreateNote.type, createNoteHandler);
  yield takeLatest(fetchUpdateNote.type, fetchUpdateNoteHandler);
  yield takeLatest(fetchDeletedNotes.type, fetchDeletedNotesHandler);
  yield takeLatest(fetchAnyNote.type, fetchAnyNoteHandler);
}
