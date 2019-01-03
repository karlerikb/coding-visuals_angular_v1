import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.css']
})
export class NoteDisplayComponent implements OnInit {

  note: Note

  constructor(private notesService: NotesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const noteId = +this.route.snapshot.params['id'];
    this.getNoteFromService(noteId);
    this.route.params.subscribe(
      (params: Params) => {
        const noteId = +params['id'];
        this.getNoteFromService(noteId);
      }
    );
  }

  getNoteFromService(noteId: number) {
    this.note = this.notesService.getSingleNote(noteId);
  }

}
