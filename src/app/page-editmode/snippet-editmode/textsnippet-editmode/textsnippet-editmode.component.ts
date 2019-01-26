import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textsnippet-editmode',
  templateUrl: './textsnippet-editmode.component.html',
  styleUrls: ['./textsnippet-editmode.component.css']
})
export class TextsnippetEditmodeComponent implements OnInit {

  @Input() snippet: string;

  constructor() { }

  ngOnInit() {
  }

}
