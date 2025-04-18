import * as NoteModel from '../models/Note.js';
import { AppError } from '../middleware/errorMiddleware.js';
import type { Note } from '../models/Note.js';

export const getAllNotes = async (): Promise<Note[]> => {
  return NoteModel.getAllNotes();
};

export const getNoteById = async (id: number): Promise<Note> => {
  const note = NoteModel.getNoteById(id);

  if (!note) {
    throw AppError.notFound('Note not found');
  }

  return note;
};

export const createNote = async (title: string, content: string): Promise<Note> => {
  // Validation already happened in middleware
  return NoteModel.createNote(title, content);
};

export const updateNote = async (id: number, title: string, content: string): Promise<Note> => {
  // Validation already happened in middleware

  const updatedNote = NoteModel.updateNote(id, title, content);

  if (!updatedNote) {
    throw AppError.notFound('Note not found');
  }

  return updatedNote;
};

export const deleteNote = async (id: number): Promise<void> => {
  const deleted = NoteModel.deleteNote(id);

  if (!deleted) {
    throw AppError.notFound('Note not found');
  }
};
