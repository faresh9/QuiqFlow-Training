import { Router } from 'express';
import * as noteController from '../controllers/noteController.js';
const router = Router();
// GET /notes - Get all notes
router.get('/', noteController.getAllNotes);
// GET /notes/:id - Get a single note
router.get('/:id', noteController.getNoteById);
// POST /notes - Create a new note
router.post('/', noteController.createNote);
// PUT /notes/:id - Update a note
router.put('/:id', noteController.updateNote);
// DELETE /notes/:id - Delete a note
router.delete('/:id', noteController.deleteNote);
export default router;
