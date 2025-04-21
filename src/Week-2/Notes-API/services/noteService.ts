import { Note, NoteStorage } from '@/Week-2/Notes-API/interfaces/Note.js';
import { AppError } from '@/Week-2/Notes-API/middleware/errorMiddleware.js';

export class NoteService {
  private storage: NoteStorage;

  constructor(storage: NoteStorage) {
    this.storage = storage;
  }

  public getAllNotes(): Note[] {
    return this.storage.notes;
  }

  public getNoteById(id: number): Note {
    const note = this.storage.notes.find((note) => note.id === id);

    if (!note) {
      throw AppError.notFound('Note not found');
    }

    return note;
  }

  public createNote(title: string, content: string): Note {
    const newNote: Note = {
      id: this.storage.nextId++,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.storage.notes.push(newNote);
    return newNote;
  }

  public updateNote(id: number, title: string, content: string): Note {
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

  public deleteNote(id: number): void {
    const initialLength = this.storage.notes.length;
    this.storage.notes = this.storage.notes.filter((note) => note.id !== id);

    if (this.storage.notes.length === initialLength) {
      throw AppError.notFound('Note not found');
    }
  }
}
