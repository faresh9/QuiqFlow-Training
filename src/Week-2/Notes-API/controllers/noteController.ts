import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorMiddleware.js';
import * as noteService from '../services/noteService.js';

// GET /notes - Get all notes
export const getAllNotes = asyncHandler(async (_req: Request, res: Response) => {
  const notes = await noteService.getAllNotes();
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
    throw AppError.badRequest('Invalid ID format');
  }

  const note = await noteService.getNoteById(id);

  res.json({
    status: 'success',
    data: note,
  });
});

// POST /notes - Create a new note
export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const newNote = await noteService.createNote(title, content);

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
    throw AppError.badRequest('Invalid ID format');
  }

  const updatedNote = await noteService.updateNote(id, title, content);

  res.json({
    status: 'success',
    data: updatedNote,
  });
});

// DELETE /notes/:id - Delete a note
export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    throw AppError.badRequest('Invalid ID format');
  }

  await noteService.deleteNote(id);


  res.json({
    status: 'success',
    message: 'Note deleted successfully',
  });
 
});
