import { Note } from './note.model';

export class Page {
  id: number;
  title: string;
  notes: Array<Note>;
}