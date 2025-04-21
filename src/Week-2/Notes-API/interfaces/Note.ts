export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteStorage {
  notes: Note[];
  nextId: number;
}
