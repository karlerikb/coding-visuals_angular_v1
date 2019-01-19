import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotePreviewService } from 'src/app/services/note-preview.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit, OnDestroy {

  private placeholderSubscription: Subscription;

  placeholder: boolean = true;

  constructor(private notePreview: NotePreviewService) { }

  ngOnInit() {
    this.placeholderSubscription = this.notePreview.notePlaceholder.subscribe(
      (condition) => {
        this.placeholder = condition;
      }
    );
  }

  ngOnDestroy() {
    this.placeholderSubscription.unsubscribe();
  }

}
