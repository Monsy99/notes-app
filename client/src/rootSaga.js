import { watchFetchNotes } from "./notes/notesSaga";
export default function* rootSaga() {
  yield watchFetchNotes();
}
