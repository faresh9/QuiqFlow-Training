import * as NoteModel from '../models/Note.js';
import { AppError } from '../middleware/errorMiddleware.js';
export const getAllNotes = async () => {
    return NoteModel.getAllNotes();
};
export const getNoteById = async (id) => {
    const note = NoteModel.getNoteById(id);
    if (!note) {
        throw new AppError('Note not found', 404);
    }
    return note;
};
export const createNote = async (title, content) => {
    // Add validation logic here
    if (title.length < 3) {
        throw new AppError('Title must be at least 3 characters long', 400);
    }
    if (content.length < 10) {
        throw new AppError('Content must be at least 10 characters long', 400);
    }
    return NoteModel.createNote(title, content);
};
export const updateNote = async (id, title, content) => {
    // Add validation logic here
    if (title.length < 3) {
        throw new AppError('Title must be at least 3 characters long', 400);
    }
    if (content.length < 10) {
        throw new AppError('Content must be at least 10 characters long', 400);
    }
    const updatedNote = NoteModel.updateNote(id, title, content);
    if (!updatedNote) {
        throw new AppError('Note not found', 404);
    }
    return updatedNote;
};
export const deleteNote = async (id) => {
    const deleted = NoteModel.deleteNote(id);
    if (!deleted) {
        throw new AppError('Note not found', 404);
    }
};
//# sourceMappingURL=noteService.js.map