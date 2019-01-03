import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Note } from '../../note.model';

@Component({
  selector: 'app-notes-list-item',
  templateUrl: './notes-list-item.component.html',
  styleUrls: ['./notes-list-item.component.css']
})
export class NotesListItemComponent implements OnInit {

  @Input() note: Note;
  @Input() noteIndexId: number;

  constructor() { }

  ngOnInit() {
  }



}
