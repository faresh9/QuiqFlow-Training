import { Request, Response } from 'express';
import { NoteStorage } from '@/Week-2/Notes-API/interfaces/Note.js';
import { NoteService } from '@/Week-2/Notes-API/services/noteService.js';
import { asyncHandler } from '@/Week-2/Notes-API/utils/asyncHandler.js';
import { AppError } from '@/Week-2/Notes-API/middleware/errorMiddleware.js';

export class NoteController {
  private noteService: NoteService;

  constructor(storage: NoteStorage) {
    this.noteService = new NoteService(storage);
    
    // Bind methods to preserve 'this' context when passed as callbacks
    this.getAllNotes = this.getAllNotes.bind(this);
    this.getNoteById = this.getNoteById.bind(this);
    this.createNote = this.createNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  public getAllNotes = asyncHandler(async (_req: Request, res: Response) => {
    const notes = this.noteService.getAllNotes();
    res.json({
      status: 'success',
      results: notes.length,
      data: notes,
    });
  });

  public getNoteById = asyncHandler(async (req: Request, res: Response) => {
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

  public createNote = asyncHandler(async (req: Request, res: Response) => {
    const { title, content } = req.body;

    const newNote = this.noteService.createNote(title, content);

    res.status(201).json({
      status: 'success',
      data: newNote,
    });
  });

  public updateNote = asyncHandler(async (req: Request, res: Response) => {
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

  public deleteNote = asyncHandler(async (req: Request, res: Response) => {
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
}
