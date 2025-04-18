import { Router, RequestHandler } from 'express';
import * as noteController from '../controllers/noteController.js';
import { validateNoteInput } from '../middleware/validationMiddleware.js';

const router = Router();

// GET /notes - Get all notes
router.get('/', noteController.getAllNotes as RequestHandler);

// GET /notes/:id - Get a single note
router.get('/:id', noteController.getNoteById as RequestHandler);

// POST /notes - Create a new note
router.post('/', validateNoteInput, noteController.createNote as RequestHandler);

// PUT /notes/:id - Update a note
router.put('/:id', validateNoteInput, noteController.updateNote as RequestHandler);

// DELETE /notes/:id - Delete a note
router.delete('/:id', noteController.deleteNote as RequestHandler);

export default router;
