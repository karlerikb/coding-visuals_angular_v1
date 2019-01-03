import { Snippet } from '../snippet/snippet.model';

export class Note {
  title: string;
  snippets: Array<Snippet>;
  tags: Array<string>;

  constructor(title: string, snippets: Array<Snippet>, tags: Array<string>) {
    this.title = title;
    this.snippets = snippets;
    this.tags = tags;
  }
}