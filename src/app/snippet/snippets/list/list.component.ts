import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

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
    const url = this.router.url.split('/');
    if (url[1] === 'notes' && url[2] === 'new') {
      this.mouseHover = true;
    } else {
      this.mouseHover = false;
    }
  }

  onMouseLeave() {
    this.mouseHover = false;
  }

  onMouseUp() {
    // console.log(window.getSelection());
  }

}
