import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SnippetsService } from '../../../snippet/snippets/snippets.service';
import { NotePreviewService } from '../note-preview.service';
import { NotesService } from '../../notes.service';
import { PagePreviewService } from 'src/app/pages/page-edit/page-preview.service';

@Component({
  selector: 'app-note-edit-form',
  templateUrl: './note-edit-form.component.html',
  styleUrls: ['./note-edit-form.component.css']
})
export class NoteEditFormComponent implements OnInit, OnDestroy {

  @ViewChild('noteForm') noteForm: NgForm;
  @ViewChild('noteTags') noteTagsEl: HTMLInputElement;

  private subscription: Subscription;

  inputText: string;
  disableAddTagBtn: boolean = true;
  addTagHasInput: boolean = false;
  saveBtnIsAllowed: boolean = false;
  addNoteToPageBtn: boolean;

  constructor(
    private snippetsService: SnippetsService,
    private notesService: NotesService,
    private notePreviewService: NotePreviewService,
    private pagePreviewService: PagePreviewService,
    private router: Router) { }

  ngOnInit() {
    this.addNoteToPageBtn = (this.router.url.split('/')[1] === 'pages') ? true : false;
    this.subscription = this.notePreviewService.saveBtnValidationChanged.subscribe(
      (condition) => {
        this.saveBtnIsAllowed = condition;
      }
    );
  }

  displaySnippets() {
    this.snippetsService.inputTextToSnippets(this.inputText);
  }

  onInputBodyChange(notesInput): void {
    this.displaySnippets();
    if (notesInput.value.trim() == '') {
      this.notePreviewService.setInputBody(false);
    } else {
      this.notePreviewService.setInputBody(true);
    }
  }

  onTitleInput(notesTitle) {
    if (notesTitle.value.trim() == '') {
      this.notePreviewService.setTitle(false);
    } else {
      this.notePreviewService.setTitle(true);
    }
  }

  onAddTagsChange(noteTagsEl: HTMLInputElement) {
    this.noteTagsEl = noteTagsEl;
    this.addTagHasInput = (this.noteTagsEl.value != '') ? true : false;
    this.disableAddTagBtn = (this.noteTagsEl.value.trim() == '') ? true : false;
  }

  clearAddTagInputField() {
    this.notePreviewService.setTags(true);
    this.noteTagsEl.value = '';
    this.disableAddTagBtn = true;
    this.addTagHasInput = false;
  }

  onAddTag() {
    const tag = this.noteTagsEl.value.trim();
    if (!this.notePreviewService.tags.includes(tag)) this.notePreviewService.tags.push(tag);
    this.clearAddTagInputField();
  }

  onClearForm() {
    this.clearAddTagInputField();
    this.notePreviewService.resetPreview();
    this.noteForm.reset();
  }

  onNoteDelete() {
    this.onClearForm();
    this.router.navigate(['/', 'notes', 'list']);
  }

  onSubmit() {
    const note = this.notePreviewService.prepareNote();
    this.notesService.addNote(note);
    this.notePreviewService.resetPreview();
    this.router.navigate(['/', 'notes', 'list']);
  }

  onAddNoteToPage() {
    const note = this.notePreviewService.prepareNote();
    this.notesService.addNote(note);
    this.notePreviewService.resetPreview();
    this.pagePreviewService.pageNotes.push(note.id);
    this.onClearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
