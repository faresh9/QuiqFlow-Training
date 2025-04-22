import { NoteService } from '@/Week-2/Notes-API/services/noteService.js';
import { asyncHandler } from '@/Week-2/Notes-API/utils/asyncHandler.js';
import { AppError } from '@/Week-2/Notes-API/middleware/errorMiddleware.js';
export class NoteController {
    constructor(storage) {
        this.getAllNotes = asyncHandler(async (_req, res) => {
            const notes = this.noteService.getAllNotes();
            res.json({
                status: 'success',
                results: notes.length,
                data: notes,
            });
        });
        this.getNoteById = asyncHandler(async (req, res) => {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw AppError.badRequest('Invalid ID format');
            }
            const note = this.noteService.getNoteById(id);
            res.json({
                status: 'success',
                data: note,
            });
        });
        this.createNote = asyncHandler(async (req, res) => {
            const { title, content } = req.body;
            const newNote = this.noteService.createNote(title, content);
            res.status(201).json({
                status: 'success',
                data: newNote,
            });
        });
        this.updateNote = asyncHandler(async (req, res) => {
            const id = parseInt(req.params.id);
            const { title, content } = req.body;
            if (isNaN(id)) {
                throw AppError.badRequest('Invalid ID format');
            }
            const updatedNote = this.noteService.updateNote(id, title, content);
            res.json({
                status: 'success',
                data: updatedNote,
            });
        });
        this.deleteNote = asyncHandler(async (req, res) => {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw AppError.badRequest('Invalid ID format');
            }
            this.noteService.deleteNote(id);
            res.json({
                status: 'success',
                message: 'Note deleted successfully',
            });
        });
        this.noteService = new NoteService(storage);
        // Bind methods to preserve 'this' context when passed as callbacks
        this.getAllNotes = this.getAllNotes.bind(this);
        this.getNoteById = this.getNoteById.bind(this);
        this.createNote = this.createNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }
}
//# sourceMappingURL=noteController.js.map