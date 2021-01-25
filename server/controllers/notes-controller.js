const Note = require("../models/note-model");

createNote = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You need to provide a proper object to create a note",
    });
  }
  const {
    title = "",
    content = "",
    version = 0,
    history = [],
    deleted = false,
  } = body;
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      error: "Missing parameters",
    });
  }
  const note = new Note({
    current: { title: title, content: content },
    version,
    history,
    deleted,
  });

  if (!note) {
    return res.status(400).json({
      success: false,
      error: "There was an issue with creating a note",
    });
  }

  note
    .save()
    .then((note) => {
      return res.status(201).json({
        data: note,
        success: true,
        _id: note._id,
        message: "Note added!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: "There was an issue with saving the note to database",
      });
    });
};

updateNote = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You need to provide a proper object",
    });
  }
  const { title = "", content = "" } = body;

  // both parameters are required to update

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      error: "Missing update parameters",
    });
  }
  try {
    Note.findOne({ _id: req.params.id }, (error, note) => {
      if (error) {
        return res.status(404).json({
          error,
          message: "Note not found!",
        });
      }
      //pushing an object that we can later use for history
      note.history.push(
        JSON.parse(
          JSON.stringify({
            note: note.current,
            modified: note.updatedAt,
            version: note.version,
          })
        )
      );
      note.current.title = title ? title : note.current.title;
      note.current.content = content ? content : note.current.content;
      note.version = note.version + 1;
      note
        .save()
        .then(() => {
          return res.status(200).json({
            data: note,
            success: true,
            _id: note._id,
            message: "Note updated!",
          });
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: "Note not updated!",
          });
        });
    });
  } catch (err) {
    console.log("Something went wrong trying to update a note by id");
    return res.status(500).json({ success: false });
  }
};

deleteNote = async (req, res) => {
  try {
    Note.findOne({ _id: req.params.id }, (error, note) => {
      if (error) {
        return res.status(400).json({
          success: false,
          error: "Note not found!",
        });
      }
      if (!note) {
        return res
          .status(404)
          .json({ success: false, error: `Note not found` });
      }
      note.deleted = true;
      note.save().then(() => {
        return res.status(200).json({
          note: note,
          success: true,
          id: note._id,
          message: "Note marked as deleted!",
        });
      });
      return res.status(200).json({ success: true, data: note });
    });
  } catch (err) {
    console.log("Sometging went wrong trying to delete a note by id");
    return res.status(500).json({ success: false });
  }
};

getNoteById = async (req, res) => {
  try {
    Note.findOne({ _id: req.params.id, deleted: false }, (error, note) => {
      if (error) {
        return res.status(400).json({
          success: false,
          error: "There was an error getting the note",
        });
      }

      if (!note) {
        return res
          .status(404)
          .json({ success: false, error: `Note not found` });
      }
      return res.status(200).json({ success: true, data: note });
    });
  } catch (err) {
    console.log("Something went wrong trying to get a not deleted note by id");
    return res.status(500).json({ success: false });
  }
};

getNotes = async (req, res) => {
  try {
    Note.find({ deleted: false }, (error, notes) => {
      if (error) {
        return res.status(400).json({
          success: false,
          error: "There was an error getting the notes",
        });
      }
      if (!notes.length) {
        return res
          .status(404)
          .json({ success: false, error: `Notes not found` });
      }
      return res.status(200).json({ success: true, data: notes });
    });
  } catch (err) {
    console.log("Something went wrong trying to get all not deleted notes");
    return res.status(500).json({ success: false });
  }
};
getDeletedNotes = async (req, res) => {
  try {
    Note.find({ deleted: true }, (error, notes) => {
      if (error) {
        return res.status(400).json({
          success: false,
          error: "There was an error getting the notes",
        });
      }
      if (!notes.length) {
        return res
          .status(404)
          .json({ success: false, error: `Notes not found` });
      }
      return res.status(200).json({ success: true, data: notes });
    });
  } catch (err) {
    console.log("Something went wrong trying to get deleted notes");
    return res.status(500).json({ success: false });
  }
};
getAnyNoteById = async (req, res) => {
  try {
    Note.findOne({ _id: req.params.id }, (error, note) => {
      if (error) {
        return res.status(400).json({
          success: false,
          error: "There was an error getting the note",
        });
      }
      if (!note) {
        return res
          .status(404)
          .json({ success: false, error: `Note not found` });
      }
      return res.status(200).json({ success: true, data: note });
    });
  } catch (err) {
    console.log("Something went wrong trying to get eny note by id");
    return res.status(500).json({ success: false });
  }
};
testSetup = async (req, res) => {
  try {
    Note.find({}, (error, notes) => {
      if (error) {
        return res.status(400).json({
          success: false,
          error: "There was an error getting the notes",
        });
      }
      const testNotes = [
        {
          title: "Title - not deleted",
          content: "Note content",
          deleted: false,
        },
        { title: "Title - deleted", content: "Note content", deleted: true },
      ];
      if (notes) {
        notes.forEach((note) => {
          note.delete();
        });
      }
      testNotes.forEach((note) => {
        new Note({
          current: { title: note.title, content: note.content },
          deleted: note.deleted,
          history: [],
          version: 0,
        }).save();
      });
      return res.status(200).json({ success: true });
    });
  } catch (err) {
    console.log("Something went wrong setting up the database for tests");
    return res.status(500).json({ success: false });
  }
};

module.exports = {
  getAnyNoteById,
  getDeletedNotes,
  createNote,
  updateNote,
  deleteNote,
  getNotes,
  getNoteById,
  testSetup,
};
