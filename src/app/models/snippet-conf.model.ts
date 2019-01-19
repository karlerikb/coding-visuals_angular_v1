export class SnippetConf {
  position: number;
  headerList: boolean;

  constructor(position?: number, headerList?: boolean) {
    this.position = position;
    this.headerList = headerList;
  }
}