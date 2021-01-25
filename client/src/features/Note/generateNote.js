import { Button, Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { fetchDeleteNote } from "../../notes/notesSlice";
import generateHistory from "./generateHistory";

const generateNote = ({ note, dispatch, history, toggleEditing, id }) => {
  const isDeleted = note && note.deleted;
  const onDeleteHandler = (e) => {
    dispatch(fetchDeleteNote({ id: id }));
    history.push(`/history/${id}`);
  };

  return (
    <Paper style={{ padding: "20px" }}>
      <Typography
        variant="h6"
        style={{
          float: "right",
          color: isDeleted ? "#aaa" : "#000",
          fontWeight: "bold",
        }}
      >
        {isDeleted ? "Deleted" : "📂 Open"}
      </Typography>
      <Typography variant="h6">Note details</Typography>
      <Typography style={{ margin: "10px 0" }} variant="h4">
        Title: "{note.current.title}"
      </Typography>
      <Typography style={{ marginBottom: "30px" }} variant="h5">
        Content: "{note.current.content}"
      </Typography>
      <Typography style={{ marginBottom: "10px" }} variant="subtitle2">
        Created at: "{new Date(note.createdAt).toLocaleString()}"
      </Typography>
      <Typography style={{ marginBottom: "10px" }} variant="subtitle2">
        Last edit: "{new Date(note.updatedAt).toLocaleString()}"
      </Typography>
      <Button
        onClick={() => {
          toggleEditing();
        }}
        style={{ marginRight: "20px" }}
        variant="outlined"
        size="large"
        color="primary"
      >
        ✏️ Edit this note
      </Button>
      <Button
        disabled={isDeleted}
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<DeleteIcon />}
        onClick={onDeleteHandler}
      >
        Delete
      </Button>
      {generateHistory({ note: note })}
    </Paper>
  );
};
export default generateNote;
