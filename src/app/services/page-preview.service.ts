import { Injectable } from '@angular/core';

import { Note } from '../models/note.model';
import { PageService } from './page.service';
import { NotePreviewService } from './note-preview.service';

@Injectable({
  providedIn: 'root'
})
export class PagePreviewService {
  
  id: number;
  title: string;
  notes: Array<Note> = [];

  noteEditMode: boolean;

  constructor(
    private notePreview: NotePreviewService,
    private pageService: PageService) { }

  generatePageId() {
    const currentPageArrayLength = this.pageService.getPages().length;
    this.id = currentPageArrayLength + 1;
  }

  initializePreview() {
    this.noteEditMode = false;
    this.generatePageId();
  }

  initializeNote() {
    this.notePreview.newNoteIsCreated = true;
    this.notePreview.generateNoteId(this.id);
  }
}
