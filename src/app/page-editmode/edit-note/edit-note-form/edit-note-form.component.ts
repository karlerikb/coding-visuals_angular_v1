import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PageDataService } from 'src/app/services/page/page-data.service';
import { NoteDataService } from 'src/app/services/note/note-data.service';
import { PageUIService } from 'src/app/services/page/page-ui.service';
import { NoteUIService } from 'src/app/services/note/note-ui.service';

@Component({
  selector: 'app-edit-note-form',
  templateUrl: './edit-note-form.component.html',
  styleUrls: ['./edit-note-form.component.css']
})
export class EditNoteFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('noteForm') form: NgForm;
  @ViewChild('noteTitle') noteTitle: NgModel;
  @ViewChild('noteText') noteText: NgModel;
  @ViewChild('noteTags') noteTags: ElementRef;

  private addTagButtonSubscription: Subscription;
  private editNoteButtonSubscription: Subscription;
  private clearNoteButtonSubscription: Subscription;

  addTagButtonIsDisabled: boolean;
  editNoteButtonIsDisabled: boolean;
  clearNoteButtonIsDisabled: boolean;

  noteId: string;
  
  constructor(
    private noteData: NoteDataService,
    private noteUI: NoteUIService,
    private pageData: PageDataService,
    private pageUI: PageUIService) { }

  ngOnInit() {
    this.noteId = this.noteData.getId();
    this.noteUI.updateTagsArrayLength(this.noteData.tags.length);

    this.addTagButtonIsDisabled = this.noteUI.getAddTagButtonCondition();
    this.editNoteButtonIsDisabled = this.noteUI.getAddNoteButtonCondition();
    this.clearNoteButtonIsDisabled = this.noteUI.getClearNoteButtonCondition();


    this.addTagButtonSubscription = this.noteUI.formAddTagButtonSubject.subscribe(
      (condition: boolean) => {
        this.addTagButtonIsDisabled = condition;
      }
    );
    this.editNoteButtonSubscription = this.noteUI.formAddNoteButtonSubject.subscribe(
      (condition: boolean) => {
        this.editNoteButtonIsDisabled = condition;
      }
    );
    this.clearNoteButtonSubscription = this.noteUI.formClearNoteButtonSubject.subscribe(
      (condition: boolean) => {
        this.clearNoteButtonIsDisabled = condition;
      }
    );
  }

  ngAfterViewInit() {
    // this is hacky.. needs to be changed when I find a better solution
    setTimeout(() => {
      this.onFillFormData();
    }, 1);
  }


  onEditNote(): void {
    const confirmEdit = confirm('Sure you want to overwrite the previous note?');
    if (confirmEdit) {
      this.setEditNoteValues();
      this.resetForm();
    }
  }

  private setEditNoteValues(): void {
    const editedNote = this.noteData.prepareNote();
    const originalNote = this.pageData.notes.find(note => note.id === editedNote.id);
    originalNote.title = editedNote.title;
    originalNote.snippets = editedNote.snippets;
    originalNote.tags = editedNote.tags;
  }

  onClearNote(): void {
    const confirmClear = confirm('Sure you want to clear this note?');
    if (confirmClear) this.clearForm();
  }

  onDeleteNote(): void {
    const confirmRemove = confirm('Sure you want to delete this note?');
    if (confirmRemove) {
      this.resetForm();
      this.pageData.removeNoteFromPage(this.noteId);
    }
  }

  onCancel(): void {
    this.resetForm();
  }

  onInputTitle(): void {
    const input = this.noteTitle.value;
    this.noteData.title = input;

    if (input.trim() == '') {
      this.noteUI.isTitleFieldSet(false);
    } else {
      this.noteUI.isTitleFieldSet(true);
    }
  }

  onInputNoteText(): void {
    const input = this.noteText.value;
    this.noteData.generateSnippets(input);

    if (input.trim() == '' || input.trim() == '*') {
      this.noteUI.isTextFieldSet(false);
    } else {
      this.noteUI.isTextFieldSet(true);
    }
  }

  onInputTagsField(): void {
    const input = this.noteTags.nativeElement.value;
    if (input.trim() == '') {
      this.noteUI.isTagsFieldSet(false);
    } else {
      this.noteUI.isTagsFieldSet(true);
    }
  }

  onAddTag(): void {
    const tag = this.noteTags.nativeElement.value;
    this.noteData.addTag(tag);
    this.resetTagsField();
  }

  private resetTagsField(): void {
    this.noteTags.nativeElement.value = '';
    this.noteUI.isTagsFieldSet(false);
  }

  private clearForm(): void {
    this.form.reset();
    this.resetTagsField();
    this.noteData.reset();
  }

  private resetForm(): void {
    this.clearForm();
    this.pageUI.removeNoteForm();
  }

  onFillFormData(): void {
    this.form.setValue({
      'noteTitle': this.noteData.title,
      'noteText': this.noteData.snippetText
    });
    this.onInputTitle();
    this.onInputNoteText();
  }

  ngOnDestroy() {
    this.addTagButtonSubscription.unsubscribe();
    this.editNoteButtonSubscription.unsubscribe();
    this.clearNoteButtonSubscription.unsubscribe();
    this.noteData.reset();
  }

}
