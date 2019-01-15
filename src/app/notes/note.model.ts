import { Snippet } from '../snippet/snippet.model';

export class Note {
  id: number;
  title: string;
  snippets: Array<Snippet>;
  tags: Array<string>;

  constructor(id: number, title: string, snippets: Array<Snippet>, tags: Array<string>) {
    this.id = id;
    this.title = title;
    this.snippets = snippets;
    this.tags = tags;
  }
}