import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCreateNote,
  toggleNewNoteModal,
  fetchUpdateNote,
} from "../../notes/notesSlice";

//if the id parameter is passed we are updating an existing note, otherwise we create a new one
const Modal = ({
  open = false,
  id = null,
  handleClose = null,
  initialTitle = "",
  initialContent = "",
}) => {
  const dispatch = useDispatch();

  const handleCloseDefault = () => {
    dispatch(toggleNewNoteModal());
  };
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onContentChange = (event) => {
    setContent(event.target.value);
  };

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const onSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && content.trim()) {
      if (id) {
        dispatch(fetchUpdateNote({ id: id, title: title, content: content }));
      } else {
        dispatch(fetchCreateNote({ title: title, content: content }));
      }
    }
    setTitle("");
    setContent("");
    setTimeout(() => {
      // we set window location so it forces browser to reload a "/notes" page
      window.location = window.location.origin;
    }, 400);
  };

  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={id ? handleClose : handleCloseDefault}
    >
      <DialogTitle>{id ? "Update note" : "Add a new note"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To ${
            id ? "update this note" : "add a new note"
          } please fill in the Title and Content fields`}
        </DialogContentText>
        <form
          id="note-input"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <TextField
            size="medium"
            margin="dense"
            label="Title"
            name="title"
            required
            fullWidth
            value={title}
            onChange={onTitleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            required
            size="medium"
            fullWidth
            label="Content"
            multiline
            rows={3}
            name="content"
            value={content}
            onChange={onContentChange}
          />
        </form>
      </DialogContent>
      <DialogActions style={{ padding: "10px", margin: "10px 15px" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={id ? handleClose : handleCloseDefault}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          type="submit"
          form="note-input"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Modal;
