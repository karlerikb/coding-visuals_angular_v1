import { Component, OnInit, Input } from '@angular/core';
import { Snippet } from 'src/app/models/snippet.model';

@Component({
  selector: 'app-snippet-editmode',
  templateUrl: './snippet-editmode.component.html',
  styleUrls: ['./snippet-editmode.component.css']
})
export class SnippetEditmodeComponent implements OnInit {

  @Input() snippet: Snippet;

  mouseHover: boolean = false;

  listSnippet: { listWithHeader: boolean, header: string, list: Array<string>} = {
    listWithHeader: null,
    header: null,
    list: null
  }
  textSnippet: string;

  constructor() { }

  ngOnInit() {
    if (this.snippet.type === 'text') this.setTextSnippet();
    if (this.snippet.type === 'list') this.setListSnippet();
  }

  setTextSnippet(): void {
    this.textSnippet = this.snippet.contents[0];
  }

  setListSnippet(): void {
    const contents = this.snippet.contents;
    if (this.snippet.conf['headerList']) {
      let headerFlag = true;
      let header = contents[0];
      let list = contents.slice(1);
      this.configureListSnippetObject(headerFlag, header, list);
    } else {
      let headerFlag = false;
      let header = '';
      let list = contents.slice();
      this.configureListSnippetObject(headerFlag, header, list);
    }
  }

  configureListSnippetObject(headerFlag: boolean, header: string, list: Array<string>): void {
    this.listSnippet.listWithHeader = headerFlag;
    this.listSnippet.header = header;
    this.listSnippet.list = list;
  }

  onMouseEnter(): void {
    this.mouseHover = true;
  }

  onMouseLeave(): void {
    this.mouseHover = false;
  }

}
