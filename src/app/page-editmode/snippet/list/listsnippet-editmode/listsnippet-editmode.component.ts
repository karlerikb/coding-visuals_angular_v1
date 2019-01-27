import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listsnippet-editmode',
  templateUrl: './listsnippet-editmode.component.html',
  styleUrls: ['./listsnippet-editmode.component.css']
})
export class ListsnippetEditmodeComponent implements OnInit {

  @Input() snippet: { listWithHeader: boolean, header: string, list: Array<string> };

  listWithHeader: boolean;
  header: string;
  list: Array<string>;

  constructor() { }

  ngOnInit() {
    this.listWithHeader = this.snippet.listWithHeader;
    this.header = this.snippet.header;
    this.list = this.snippet.list;
  }
}
