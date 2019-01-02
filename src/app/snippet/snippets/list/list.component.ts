import { Component, OnInit, Input } from '@angular/core';

import { Snippet } from '../../snippet.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() snippet: Snippet;
  mouseHover: boolean = false;

  noPreList: boolean;
  listHeader: string;
  preListArray: Array<string>;

  constructor() { }

  ngOnInit() {
    if (this.snippet.conf && this.snippet.conf['preList']) {
      this.listHeader = this.snippet.contents[0];
      this.preListArray = this.snippet.contents.slice(1);
      this.noPreList = false;
    } else {
      this.noPreList = true;
    }
  }

  onMouseEnter() {
    this.mouseHover = true;
  }

  onMouseLeave() {
    this.mouseHover = false;
  }

  onMouseUp() {
    // console.log(window.getSelection());
  }

}
