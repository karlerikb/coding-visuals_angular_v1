export class Snippet {
  type: string;
  contents: Array<string>;
  conf: {};

  constructor(type: string, contents: Array<string>, conf?: {}) {
    this.type = type;
    this.contents = contents;
    this.conf = conf;
  }
}