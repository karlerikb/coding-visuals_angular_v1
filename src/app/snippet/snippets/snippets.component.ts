import { Component, OnInit, Input } from '@angular/core';

import { Snippet } from '../snippet.model';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent implements OnInit {

  @Input() snippet: Snippet;
  
  constructor() { }

  ngOnInit() {
  }

}
