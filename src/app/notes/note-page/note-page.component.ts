import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { Note } from '../note.model';

@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.css']
})
export class NotePageComponent implements OnInit {

  note: Note;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.note = data['note'];
      }
    );
  }

  onNavigateBackToNotesList() {
    const activeNoteId = this.route.snapshot.params['id'];
    this.router.navigate(['/', 'notes', 'list', activeNoteId]);
  }

}
