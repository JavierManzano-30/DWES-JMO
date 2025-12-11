const { listNotes } = require('../services/notes');

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

module.exports = { getNotes };
