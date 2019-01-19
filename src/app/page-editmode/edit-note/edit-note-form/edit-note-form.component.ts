import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PagePreviewService } from 'src/app/services/page-preview.service';
import { NotePreviewService } from 'src/app/services/note-preview.service';

@Component({
  selector: 'app-edit-note-form',
  templateUrl: './edit-note-form.component.html',
  styleUrls: ['./edit-note-form.component.css']
})
export class EditNoteFormComponent implements OnInit, OnDestroy {

  @ViewChild('noteForm') form: NgForm;
  @ViewChild('noteTags') noteTags: ElementRef;

  private tagButtonSubscription: Subscription;
  private clearNoteButtonSubscription: Subscription;

  tagButtonDisabled: boolean = true;
  addNoteButtonDisabled: boolean = true;
  clearNoteButtonDisabled: boolean = true;
  
  constructor(
    private notePreview: NotePreviewService,
    private pagePreview: PagePreviewService) { }

  ngOnInit() {
    this.tagButtonSubscription = this.notePreview.formTagButton.subscribe(
      (condition) => {
        this.tagButtonDisabled = condition;
      }
    );
    this.clearNoteButtonSubscription = this.notePreview.clearNoteButton.subscribe(
      (condition) => {
        this.clearNoteButtonDisabled = condition;
      }
    );
  }

  onAddNote() {
    console.log('Note added!');
  }

  onClearNote() {
    this.resetNoteForm();
    console.log('Note cleared!');
  }

  onDeleteNote() {
    this.resetNoteForm();
    this.pagePreview.noteEditMode = false;
    console.log('Note deleted');
  }

  onCancel() {
    console.log('Cancelled!');
  }

  onInputTitle(noteTitleInput) {
    const input = noteTitleInput.value;
    this.notePreview.title = input;

    if (input.trim() == '') {
      this.notePreview.isTitleFieldSet(false);
    } else {
      this.notePreview.isTitleFieldSet(true);
    }
  }

  onInputNoteText(noteTextInput) {
    const input = noteTextInput.value;
    this.notePreview.generateNoteSnippets(input);

    if (input.trim() == '' || input.trim() == '*') {
      this.notePreview.isTextFieldSet(false);
      this.addNoteButtonDisabled = true;
    } else {
      this.notePreview.isTextFieldSet(true);
      this.addNoteButtonDisabled = false;
    }
  }

  onInputTagsField(noteTagsFieldInput) {
    const input = noteTagsFieldInput.value;

    if (input.trim() == '') {
      this.notePreview.isTagsFieldSet(false);
    } else {
      this.notePreview.isTagsFieldSet(true);
    }
  }

  onAddTag(noteTagsInput: HTMLInputElement) {
    this.notePreview.addTag(noteTagsInput.value);
    this.resetTagsField();
  }

  resetTagsField() {
    this.noteTags.nativeElement.value = '';
    this.notePreview.isTagsFieldSet(false);
  }

  resetNoteForm() {
    this.form.reset();
    this.resetTagsField();
    this.notePreview.clearPreview();
    this.addNoteButtonDisabled = true;
  }

  ngOnDestroy() {
    this.tagButtonSubscription.unsubscribe();
    this.clearNoteButtonSubscription.unsubscribe();
  }
}
