import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeletedNotes,
  selectError,
  selectLoading,
  selectNotes,
} from "../../notes/notesSlice";
import List from "../../Components/List";
import Wrapper from "../../Components/Wrapper";
import Error from "../../Components/Error";
import Loader from "../../Components/Loader";

const DeletedNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    if (!notes && !loading) {
      dispatch(fetchDeletedNotes());
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
    notes && (
      <Wrapper>
        <List historical={true} notes={notes}></List>
      </Wrapper>
    )
  );
};
export default DeletedNotes;
