import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Snippet } from '../snippet.model';

@Component({
  selector: 'app-snippets-list',
  templateUrl: './snippets-list.component.html',
  styleUrls: ['./snippets-list.component.css']
})
export class SnippetsListComponent implements OnInit, OnChanges {

  @Input() snippets: Array<Snippet>;
  setPlaceholder: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.snippets.length === 0) {
      this.setPlaceholder = true;
    } else {
      this.setPlaceholder = false;
    }
  }

}
