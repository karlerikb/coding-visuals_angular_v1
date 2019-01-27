import { SnippetConf } from './snippet-conf.model';

export class Snippet {
  id: string;
  type: string;
  contents: Array<string>;
  conf: SnippetConf;

  constructor(id: string, type: string, contents: Array<string>, conf: SnippetConf ) {
    this.id = id;
    this.type = type;
    this.contents = contents;
    this.conf = conf;
  }
}