import { Router } from 'express';
import * as noteController from '../controllers/noteController.js';
import { validateNoteInput } from '../middleware/validationMiddleware.js';
const router = Router();
// GET /notes - Get all notes
router.get('/', noteController.getAllNotes);
// GET /notes/:id - Get a single note
router.get('/:id', noteController.getNoteById);
// POST /notes - Create a new note
router.post('/', validateNoteInput, noteController.createNote);
// PUT /notes/:id - Update a note
router.put('/:id', validateNoteInput, noteController.updateNote);
// DELETE /notes/:id - Delete a note
router.delete('/:id', noteController.deleteNote);
export default router;
//# sourceMappingURL=noteRoutes.js.map