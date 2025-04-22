import { NoteController } from '@/Week-2/Notes-API/controllers/noteController.js';
import { validateNoteInput } from '@/Week-2/Notes-API/middleware/validationMiddleware.js';
export class Router {
    constructor(app, storage) {
        this.app = app;
        // Just pass the storage directly to the controller without storing it locally
        this.noteController = new NoteController(storage);
    }
    setupRoutes() {
        // Routes remain the same
        this.app.get('/notes', this.noteController.getAllNotes);
        this.app.get('/notes/:id', this.noteController.getNoteById);
        this.app.post('/notes', validateNoteInput, this.noteController.createNote);
        this.app.put('/notes/:id', validateNoteInput, this.noteController.updateNote);
        this.app.delete('/notes/:id', this.noteController.deleteNote);
    }
}
//# sourceMappingURL=noteRoutes.js.map