import { Component, OnInit, Input } from '@angular/core';
import { Snippet } from 'src/app/models/snippet.model';

@Component({
  selector: 'app-textsnippet-editmode',
  templateUrl: './textsnippet-editmode.component.html',
  styleUrls: ['./textsnippet-editmode.component.css']
})
export class TextsnippetEditmodeComponent implements OnInit {

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

}
