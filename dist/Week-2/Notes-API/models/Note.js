// In-memory store for notes
let notes = [];
let nextId = 1;
// Note model functions
export const getAllNotes = () => {
    return notes;
};
export const getNoteById = (id) => {
    return notes.find((note) => note.id === id);
};
export const createNote = (title, content) => {
    const newNote = {
        id: nextId++,
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    notes.push(newNote);
    return newNote;
};
export const updateNote = (id, title, content) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1)
        return null;
    const updatedNote = {
        ...notes[noteIndex],
        title,
        content,
        updatedAt: new Date(),
    };
    notes[noteIndex] = updatedNote;
    return updatedNote;
};
export const deleteNote = (id) => {
    const initialLength = notes.length;
    notes = notes.filter((note) => note.id !== id);
    return notes.length !== initialLength;
};
//# sourceMappingURL=Note.js.map