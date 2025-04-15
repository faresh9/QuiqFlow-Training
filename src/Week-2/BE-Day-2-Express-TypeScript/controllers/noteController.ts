import { Request, Response, NextFunction } from 'express';
import * as NoteModel from '../models/Note.js';

// GET /notes - Get all notes
export const getAllNotes = (req: Request, res: Response) => {
  const notes = NoteModel.getAllNotes();
  res.json(notes);
};

// GET /notes/:id - Get a note by ID
export const getNoteById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  
  const note = NoteModel.getNoteById(id);
  
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  res.json(note);
};

// POST /notes - Create a new note
export const createNote = (req: Request, res: Response) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  
  const newNote = NoteModel.createNote(title, content);
  
  res.status(201).json(newNote);
};

// PUT /notes/:id - Update a note
export const updateNote = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  
  const updatedNote = NoteModel.updateNote(id, title, content);
  
  if (!updatedNote) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  res.json(updatedNote);
};

// DELETE /notes/:id - Delete a note
export const deleteNote = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  
  const deleted = NoteModel.deleteNote(id);
  
  if (!deleted) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  res.status(204).send();
};