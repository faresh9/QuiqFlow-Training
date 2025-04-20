import * as NoteModel from '../models/Note.js';
import { AppError } from '../middleware/errorMiddleware.js';
export const getAllNotes = async () => {
    return NoteModel.getAllNotes();
};
export const getNoteById = async (id) => {
    const note = NoteModel.getNoteById(id);
    if (!note) {
        throw AppError.notFound('Note not found');
    }
    return note;
};
export const createNote = async (title, content) => {
    // Validation already happened in middleware
    return NoteModel.createNote(title, content);
};
export const updateNote = async (id, title, content) => {
    // Validation already happened in middleware
    const updatedNote = NoteModel.updateNote(id, title, content);
    if (!updatedNote) {
        throw AppError.notFound('Note not found');
    }
    return updatedNote;
};
export const deleteNote = async (id) => {
    const deleted = NoteModel.deleteNote(id);
    if (!deleted) {
        throw AppError.notFound('Note not found');
    }
};
//# sourceMappingURL=noteService.js.map