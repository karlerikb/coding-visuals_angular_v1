import { Component, OnInit, Input } from '@angular/core';

import { Snippet } from '../../snippet.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input() snippet: Snippet;
  mouseHover: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
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
