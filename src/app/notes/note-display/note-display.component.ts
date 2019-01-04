import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Note } from '../note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.css']
})
export class NoteDisplayComponent implements OnInit {

  note: Note
  noteId: number;

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.noteId = +this.route.snapshot.params['id'];
    this.getNoteFromService(this.noteId);
    this.route.params.subscribe(
      (params: Params) => {
        this.noteId = +params['id'];
        this.getNoteFromService(this.noteId);
      }
    );
  }

  getNoteFromService(noteId: number) {
    this.note = this.notesService.getSingleNote(noteId);
  }

  onOpenNote() {
    console.log('opened note!', this.noteId);
    this.router.navigate(['/','note', this.noteId]);
  }

}
