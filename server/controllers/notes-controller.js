const Note = require("../models/note-model");
// mapToRecent  maps the note object to contain only the most recent information about
// note by default the note contains its own version history under "history" key
const mapToRecent = (note) => {
  return {
    title: note.current.title,
    content: note.current.content,
    _id: note._id,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
    deleted: note.deleted,
    version: note.version,
  };
};

createNote = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You need to provide a proper object to create a note",
    });
  }
  const { title = "", content = "" } = body;
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      error: "Missing parameters",
    });
  }
  const note = new Note({
    current: { title: title, content: content },
    version: 0,
    history: [],
    deleted: false,
  });
  note.save().then((note) => {
    return res.status(201).json({
      success: true,
      _id: note._id,
      message: "Note added!",
    });
  });
};

updateNote = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You need to provide a proper object to update a note",
    });
  }
  const { title = "", content = "" } = body;
  if (!content) {
    return res.status(400).json({
      success: false,
      error: "Missing update parameters",
    });
  }
  Note.findOne({ _id: req.params.id }, (error, note) => {
    if (error || !note) {
      return res.status(400).json({
        success: false,
        message: "There was an error trying to get a note",
      });
    }
    // pushing an object that we can later use for history
    note.history.push(
      // the json parse json stringify construction is here to create a new
      // instance of an object instead of passing a reference
      JSON.parse(
        JSON.stringify({
          note: note.current,
          updatedAt: note.updatedAt,
          version: note.version,
        })
      )
    );
    note.current.title = title ? title : note.current.title;
    note.current.content = content;
    note.version = note.version + 1;
    note.save().then(() => {
      return res.status(200).json({
        success: true,
        _id: note._id,
        message: "Note updated!",
      });
    });
  });
};

deleteNote = (req, res) => {
  Note.findOne({ _id: req.params.id }, (error, note) => {
    if (error || !note) {
      return res.status(400).json({
        success: false,
        error: "There was an error trying to get the note",
      });
    }
    note.deleted = true;
    note.save().then(() => {
      return res.status(200).json({
        success: true,
        _id: note._id,
        message: "Note marked as deleted!",
      });
    });
  });
};

getNoteById = (req, res) => {
  Note.findOne({ _id: req.params.id, deleted: false }, (error, note) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error: "There was an error trying to get the note",
      });
    }
    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }
    return res.status(200).json({ success: true, data: mapToRecent(note) });
  });
};

getNotes = (req, res) => {
  Note.find({ deleted: false }, (error, notes) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error: "There was an error trying to get the notes",
      });
    }
    if (!notes.length) {
      return res.status(404).json({
        success: false,
        error: "Requested data is empty",
      });
    }
    const recentNotes = notes.map((note) => mapToRecent(note));
    return res.status(200).json({ success: true, data: recentNotes });
  });
};
getDeletedNotes = (req, res) => {
  Note.find({ deleted: true }, (error, notes) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error: "There was an error trying to get the notes",
      });
    }
    if (!notes.length) {
      return res.status(404).json({
        success: false,
        error: "Requested data is empty",
      });
    }
    const recentNotes = notes.map((note) => mapToRecent(note));
    return res.status(200).json({ success: true, data: recentNotes });
  });
};
getFullNoteById = (req, res) => {
  Note.findOne({ _id: req.params.id }, (error, note) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error: "There was an error trying to get the note",
      });
    }
    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }
    return res.status(200).json({ success: true, data: note });
  });
};

// endpoint to prepare the database to test CRUD operations

testSetup = (req, res) => {
  Note.find({}, (error, notes) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error: "There was an error trying to get the notes",
      });
    }
    if (notes) {
      notes.forEach((note) => {
        note.delete();
      });
    }
    const testNotes = [
      {
        title: "Title of an example note",
        content: "Example content",
        deleted: false,
      },
      {
        title: "Title of a deleted note",
        content: "Deleted note content",
        deleted: true,
      },
    ];
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
};

module.exports = {
  getFullNoteById,
  getDeletedNotes,
  createNote,
  updateNote,
  deleteNote,
  getNotes,
  getNoteById,
  testSetup,
};
