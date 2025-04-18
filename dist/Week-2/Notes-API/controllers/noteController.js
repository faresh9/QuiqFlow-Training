import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorMiddleware.js';
import * as noteService from '../services/noteService.js';
// GET /notes - Get all notes
export const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await noteService.getAllNotes();
    res.json({
        status: 'success',
        results: notes.length,
        data: notes,
    });
});
// GET /notes/:id - Get a note by ID
export const getNoteById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new AppError('Invalid ID format', 400);
    }
    const note = await noteService.getNoteById(id);
    res.json({
        status: 'success',
        data: note,
    });
});
// POST /notes - Create a new note
export const createNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        throw new AppError('Title and content are required', 400);
    }
    const newNote = await noteService.createNote(title, content);
    res.status(201).json({
        status: 'success',
        data: newNote,
    });
});
// PUT /notes/:id - Update a note
export const updateNote = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    if (isNaN(id)) {
        throw new AppError('Invalid ID format', 400);
    }
    if (!title || !content) {
        throw new AppError('Title and content are required', 400);
    }
    const updatedNote = await noteService.updateNote(id, title, content);
    res.json({
        status: 'success',
        data: updatedNote,
    });
});
// DELETE /notes/:id - Delete a note
export const deleteNote = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        throw new AppError('Invalid ID format', 400);
    }
    await noteService.deleteNote(id);
    res.status(204).send();
});
//# sourceMappingURL=noteController.js.map