import { Component, OnInit } from '@angular/core';

import { PagePreviewUiService } from 'src/app/services/page-preview-ui.service';
import { PagePreviewService } from 'src/app/services/page-preview.service';
import { NotePreviewService } from 'src/app/services/note-preview.service';
import { NotePreviewUiService } from 'src/app/services/note-preview-ui.service';

@Component({
  selector: 'app-edit-note-placeholder',
  templateUrl: './edit-note-placeholder.component.html',
  styleUrls: ['./edit-note-placeholder.component.css']
})
export class EditNotePlaceholderComponent implements OnInit {

  constructor(
    private pageData: PagePreviewService,
    private pageUI: PagePreviewUiService,
    private noteData: NotePreviewService,
    private noteUI: NotePreviewUiService) { }

  ngOnInit() {
  }

  onInitializeNewNote() {
    this.pageUI.displayNoteForm();
    this.noteUI.initNewNoteCreation();

    const pageId = this.pageData.getId();
    const noteIdCounter = this.pageData.getNoteIdCounter();

    this.noteData.initNew(pageId, noteIdCounter);
  }
}
