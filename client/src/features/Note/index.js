import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Wrapper from "../../Components/Wrapper";
import {
  fetchAnyNote,
  selectError,
  selectLoading,
  selectNote,
} from "../../notes/notesSlice";
import Modal from "../../Components/Modal";
import Error from "../../Components/Error";
import Loader from "../../Components/Loader";
import generateNote from "./generateNote";

const Note = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const note = useSelector(selectNote);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [editing, setEditing] = useState(false);
  const toggleEditing = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (!note && !loading) {
      dispatch(fetchAnyNote(id));
    }
  });

  if (error) {
    return <Error></Error>;
  }

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    !loading &&
    note && (
      <Wrapper>
        {generateNote({
          note: note,
          id: id,
          dispatch: dispatch,
          history: history,
          editing: editing,
          setEditing: setEditing,
          toggleEditing: toggleEditing,
        })}
        {/* Modal to edit note content */}
        <Modal
          open={editing}
          updateNote={true}
          initialContent={note.current.content}
          initialTitle={note.current.title}
          id={id}
          handleClose={toggleEditing}
        ></Modal>
      </Wrapper>
    )
  );
};
export default Note;
