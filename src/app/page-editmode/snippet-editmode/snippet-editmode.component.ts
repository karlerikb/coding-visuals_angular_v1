import { Component, OnInit, Input } from '@angular/core';
import { Snippet } from 'src/app/models/snippet.model';

@Component({
  selector: 'app-snippet-editmode',
  templateUrl: './snippet-editmode.component.html',
  styleUrls: ['./snippet-editmode.component.css']
})
export class SnippetEditmodeComponent implements OnInit {

  @Input() snippet: Snippet;

  constructor() { }

  ngOnInit() {
  }

}
