import { Request, Response } from 'express';
import * as NoteModel from '../models/Note.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorMiddleware.js';

// GET /notes - Get all notes
export const getAllNotes = asyncHandler(async (req: Request, res: Response) => {
  const notes = NoteModel.getAllNotes();
  res.json({
    status: 'success',
    results: notes.length,
    data: notes,
  });
});

// GET /notes/:id - Get a note by ID
export const getNoteById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    throw new AppError('Invalid ID format', 400);
  }

  const note = NoteModel.getNoteById(id);

  if (!note) {
    throw new AppError('Note not found', 404);
  }

  res.json({
    status: 'success',
    data: note,
  });
});

// POST /notes - Create a new note
export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new AppError('Title and content are required', 400);
  }

  const newNote = NoteModel.createNote(title, content);

  res.status(201).json({
    status: 'success',
    data: newNote,
  });
});

// PUT /notes/:id - Update a note
export const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  if (isNaN(id)) {
    throw new AppError('Invalid ID format', 400);
  }

  if (!title || !content) {
    throw new AppError('Title and content are required', 400);
  }

  const updatedNote = NoteModel.updateNote(id, title, content);

  if (!updatedNote) {
    throw new AppError('Note not found', 404);
  }

  res.json({
    status: 'success',
    data: updatedNote,
  });
});

// DELETE /notes/:id - Delete a note
export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    throw new AppError('Invalid ID format', 400);
  }

  const deleted = NoteModel.deleteNote(id);

  if (!deleted) {
    throw new AppError('Note not found', 404);
  }

  res.status(204).send();
});
