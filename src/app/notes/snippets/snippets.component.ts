import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent implements OnInit {

  @Input() snippet: { type: string, contents: Array<string> };
  
  constructor() { }

  ngOnInit() {
  }

}
