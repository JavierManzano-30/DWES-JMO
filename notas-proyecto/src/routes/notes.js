const { Router } = require('express');
const {
  getNotes,
  getNoteById,
  postNote,
  putNote,
  deleteNoteById,
} = require('../controllers/notes');

const router = Router();

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', postNote);
router.put('/:id', putNote);
router.delete('/:id', deleteNoteById);

module.exports = router;
