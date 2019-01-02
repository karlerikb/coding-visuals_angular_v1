import { Component, OnInit, Input } from '@angular/core';

import { Snippet } from '../../snippet.model';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input() snippet: Snippet;
  mouseHover: boolean = false;

  constructor() { }

  ngOnInit() {
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
