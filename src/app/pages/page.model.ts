export class Page {
  id: number;
  title: string;
  noteIds: Array<number>;

  constructor(id: number, title: string, noteIds: Array<number>) {
    this.id = id;
    this.title = title;
    this.noteIds = noteIds;
  }
}