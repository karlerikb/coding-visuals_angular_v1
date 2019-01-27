import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PageDataService } from 'src/app/services/page/page-data.service';
import { NoteDataService } from 'src/app/services/note/note-data.service';
import { PageUIService } from 'src/app/services/page/page-ui.service';
import { NoteUIService } from 'src/app/services/note/note-ui.service';

@Component({
  selector: 'app-new-note-form',
  templateUrl: './new-note-form.component.html',
  styleUrls: ['./new-note-form.component.css']
})
export class NewNoteFormComponent implements OnInit, OnDestroy {

  @ViewChild('noteForm') form: NgForm;
  @ViewChild('noteTags') noteTags: ElementRef;

  private addTagButtonSubscription: Subscription;
  private addNoteButtonSubscription: Subscription;
  private clearNoteButtonSubscription: Subscription;

  addTagButtonIsDisabled: boolean;
  addNoteButtonIsDisabled: boolean;
  clearNoteButtonIsDisabled: boolean;

  noteId: string;
  
  constructor(
    private noteData: NoteDataService,
    private noteUI: NoteUIService,
    private pageData: PageDataService,
    private pageUI: PageUIService) { }

  ngOnInit() {
    this.noteId = this.noteData.getId();
    this.noteUI.updateTagsArrayLength(0);

    this.addTagButtonIsDisabled = this.noteUI.getAddTagButtonCondition();
    this.addNoteButtonIsDisabled = this.noteUI.getAddNoteButtonCondition();
    this.clearNoteButtonIsDisabled = this.noteUI.getClearNoteButtonCondition();

    this.addTagButtonSubscription = this.noteUI.formAddTagButtonSubject.subscribe(
      (condition: boolean) => {
        this.addTagButtonIsDisabled = condition;
      }
    );
    this.addNoteButtonSubscription = this.noteUI.formAddNoteButtonSubject.subscribe(
      (condition: boolean) => {
        this.addNoteButtonIsDisabled = condition;
      }
    );
    this.clearNoteButtonSubscription = this.noteUI.formClearNoteButtonSubject.subscribe(
      (condition: boolean) => {
        this.clearNoteButtonIsDisabled = condition;
      }
    );
  }

  onAddNote(): void {
    const note = this.noteData.prepareNote();
    this.pageData.addNoteToPage(note);
    this.resetForm();
  }

  onClearNote(): void {
    const confirmClear = confirm('Sure you want to clear this note?');
    if (confirmClear) this.clearForm();
  }

  onDeleteNote(): void {
    const confirmRemove = confirm('Sure you want to delete this note?');
    if (confirmRemove) {
      this.resetForm();
    }
  }

  onCancel(): void {
    this.resetForm();
  }

  onInputTitle(noteTitleInput: NgModel): void {
    const input = noteTitleInput.value;
    this.noteData.title = input;

    if (input.trim() == '') {
      this.noteUI.isTitleFieldSet(false);
    } else {
      this.noteUI.isTitleFieldSet(true);
    }
  }

  onInputNoteText(noteTextInput: NgModel) {
    const input = noteTextInput.value;
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

  ngOnDestroy() {
    this.addTagButtonSubscription.unsubscribe();
    this.addNoteButtonSubscription.unsubscribe();
    this.clearNoteButtonSubscription.unsubscribe();
    this.noteData.reset();
  }
}
