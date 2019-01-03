import { Component, OnInit } from '@angular/core';

import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  constructor(private notesService: NotesService) { }

  notes: Array<Note>;

  ngOnInit() {
    this.notes = this.notesService.getNotes();
  }


}
