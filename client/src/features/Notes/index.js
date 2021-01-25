import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotes,
  selectError,
  selectLoading,
  selectNotes,
} from "../../notes/notesSlice";
import List from "../../Components/List/index";
import Error from "../../Components/Error";
import Wrapper from "../../Components/Wrapper";
import Loader from "../../Components/Loader";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    if (!notes) {
      dispatch(fetchNotes());
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
    !!notes && (
      <Wrapper>
        <List notes={notes}></List>
      </Wrapper>
    )
  );
};
export default Notes;
