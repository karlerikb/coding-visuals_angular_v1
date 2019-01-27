import { Note } from '../note/note.model';

export class Page {
  id: number;
  title: string;
  notes: Array<Note>;
}