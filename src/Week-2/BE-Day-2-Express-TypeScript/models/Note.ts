export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory store for notes
let notes: Note[] = [];
let nextId = 1;

// Note model functions
export const getAllNotes = (): Note[] => {
  return notes;
};

export const getNoteById = (id: number): Note | undefined => {
  return notes.find((note) => note.id === id);
};

export const createNote = (title: string, content: string): Note => {
  const newNote: Note = {
    id: nextId++,
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  notes.push(newNote);
  return newNote;
};

export const updateNote = (id: number, title: string, content: string): Note | null => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) return null;

  const updatedNote = {
    ...notes[noteIndex],
    title,
    content,
    updatedAt: new Date(),
  };

  notes[noteIndex] = updatedNote;
  return updatedNote;
};

export const deleteNote = (id: number): boolean => {
  const initialLength = notes.length;
  notes = notes.filter((note) => note.id !== id);

  return notes.length !== initialLength;
};
