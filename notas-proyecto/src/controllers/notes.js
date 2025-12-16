const {
  listNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('../services/notes');

function getNotes(req, res) {
  const {
    titleContains,
    contentContains,
    category,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
    sortBy,
    sortDir,
    page,
    pageSize,
  } = req.query;

  const result = listNotes({
    filters: {
      titleContains,
      contentContains,
      category,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
    },
    sort: { by: sortBy, dir: sortDir },
    pagination: { page, pageSize },
  });

  return res.status(200).json(result);
}

function getNoteById(req, res) {
  const note = getNote(req.params.id);
  if (!note) {
    return res.status(404).json({ message: 'Nota no encontrada' });
  }
  return res.status(200).json(note);
}

function postNote(req, res) {
  const { title, content, category } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ message: 'title y content son obligatorios' });
  }
  const created = createNote({ title, content, category });
  return res.status(201).json(created);
}

function putNote(req, res) {
  const { title, content, category } = req.body || {};
  const updated = updateNote(req.params.id, { title, content, category });
  if (!updated) {
    return res.status(404).json({ message: 'Nota no encontrada' });
  }
  return res.status(200).json(updated);
}

function deleteNoteById(req, res) {
  const removed = deleteNote(req.params.id);
  if (!removed) {
    return res.status(404).json({ message: 'Nota no encontrada' });
  }
  return res.status(204).send();
}

module.exports = { getNotes, getNoteById, postNote, putNote, deleteNoteById };
