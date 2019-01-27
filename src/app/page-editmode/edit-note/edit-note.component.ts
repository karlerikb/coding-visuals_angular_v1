import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NoteUIService } from 'src/app/services/note/note-ui.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit, OnDestroy {

  private previewPlaceholderSubscription: Subscription;

  newNoteIsCreated: boolean;
  previewPlaceholder: boolean;

  constructor(private UI: NoteUIService) { }

  ngOnInit() {
    this.newNoteIsCreated = this.UI.getNewNoteIsCreatedCondition();
    this.previewPlaceholder = this.UI.getPreviewPlaceholderCondition();
    this.previewPlaceholderSubscription = this.UI.previewPlaceholderSubject.subscribe(
      (condition: boolean) => {
        this.previewPlaceholder = condition;
      }
    );
  }
  
  ngOnDestroy() {
    this.previewPlaceholderSubscription.unsubscribe();
  }
}
