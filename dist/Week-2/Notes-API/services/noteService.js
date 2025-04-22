import { AppError } from '@/Week-2/Notes-API/middleware/errorMiddleware.js';
export class NoteService {
    constructor(storage) {
        this.storage = storage;
    }
    getAllNotes() {
        return this.storage.notes;
    }
    getNoteById(id) {
        const note = this.storage.notes.find((note) => note.id === id);
        if (!note) {
            throw AppError.notFound('Note not found');
        }
        return note;
    }
    createNote(title, content) {
        const newNote = {
            id: this.storage.nextId++,
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.storage.notes.push(newNote);
        return newNote;
    }
    updateNote(id, title, content) {
        const noteIndex = this.storage.notes.findIndex((note) => note.id === id);
        if (noteIndex === -1) {
            throw AppError.notFound('Note not found');
        }
        const updatedNote = {
            ...this.storage.notes[noteIndex],
            title,
            content,
            updatedAt: new Date(),
        };
        this.storage.notes[noteIndex] = updatedNote;
        return updatedNote;
    }
    deleteNote(id) {
        const initialLength = this.storage.notes.length;
        this.storage.notes = this.storage.notes.filter((note) => note.id !== id);
        if (this.storage.notes.length === initialLength) {
            throw AppError.notFound('Note not found');
        }
    }
}
//# sourceMappingURL=noteService.js.map