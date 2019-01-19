import { Component, OnInit, Input } from '@angular/core';
import { Snippet } from 'src/app/models/snippet.model';

@Component({
  selector: 'app-listsnippet-editmode',
  templateUrl: './listsnippet-editmode.component.html',
  styleUrls: ['./listsnippet-editmode.component.css']
})
export class ListsnippetEditmodeComponent implements OnInit {

  @Input() snippet: Snippet;

  mouseHover: boolean = false;
  listWithHeader: boolean;
  header: string;
  list: Array<string>;


  constructor() { }

  ngOnInit() {
    if (this.snippet.conf['headerList']) {
      this.listWithHeader = true;
      this.header = this.snippet.contents[0];
      this.list = this.snippet.contents.slice(1);
    } else {
      this.listWithHeader = false;
    }
  }

  onMouseEnter() {
    this.mouseHover = true;
  }

  onMouseLeave() {
    this.mouseHover = false;
  }

}
