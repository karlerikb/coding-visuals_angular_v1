import { Component, OnInit } from '@angular/core';

import { PageUIService } from 'src/app/services/page/page-ui.service';
import { PageDataService } from 'src/app/services/page/page-data.service';
import { NoteDataService } from 'src/app/services/note/note-data.service';
import { NoteUIService } from 'src/app/services/note/note-ui.service';

@Component({
  selector: 'app-edit-note-placeholder',
  templateUrl: './edit-note-placeholder.component.html',
  styleUrls: ['./edit-note-placeholder.component.css']
})
export class EditNotePlaceholderComponent implements OnInit {

  constructor(
    private pageData: PageDataService,
    private pageUI: PageUIService,
    private noteData: NoteDataService,
    private noteUI: NoteUIService) { }

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
