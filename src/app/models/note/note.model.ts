import { Snippet } from '../snippet/snippet.model';
import { NoteConf } from './note-conf.model';

export class Note {
  id: string;
  title: string;
  snippets: Array<Snippet>;
  tags: Array<string>;
  conf: NoteConf;

  constructor(id: string, title: string, snippets: Array<Snippet>, tags: Array<string>, conf: NoteConf) {
    this.id = id;
    this.title = title;
    this.snippets = snippets;
    this.tags = tags;
    this.conf = conf;
  }
}