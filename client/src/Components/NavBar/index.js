import { Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectNewNoteModal, toggleNewNoteModal } from "../../notes/notesSlice";
import Modal from "../Modal";

import Wrapper from "../Wrapper";

const NavBar = () => {
  const url = window.location.origin;
  const dispatch = useDispatch();
  const newNoteModal = useSelector(selectNewNoteModal);
  return (
    <Wrapper>
      <Typography variant="h4" style={{ marginBottom: "30px" }}>
        Notes App
      </Typography>
      <Button
        style={{ float: "right" }}
        color="primary"
        size="large"
        href="http://Monsy99.github.io"
        target="_blank"
      >
        Author
      </Button>
      <Button
        size="large"
        variant="outlined"
        color="primary"
        onClick={() => dispatch(toggleNewNoteModal())}
        style={{ marginRight: "30px" }}
      >
        + Add a new note
      </Button>
      <Button
        variant="contained"
        href={`${url}/notes`}
        size="large"
        color="primary"
        type="outline"
        style={{ marginRight: "30px" }}
      >
        {window.location.pathname.includes("/notes")
          ? "reload notes"
          : "⬅ Go back to notes"}
      </Button>
      <Button
        variant="contained"
        href={`${url}/history`}
        size="large"
        color="primary"
        type="outline"
      >
        {window.location.pathname.includes("/history")
          ? "reload history"
          : "📖 history"}
      </Button>

      <Modal open={newNoteModal}></Modal>
    </Wrapper>
  );
};

export default NavBar;
