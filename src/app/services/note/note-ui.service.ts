import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteUIService {

  previewPlaceholderSubject = new Subject<boolean>();
  formAddTagButtonSubject = new Subject<boolean>();
  formAddNoteButtonSubject = new Subject<boolean>();
  formClearNoteButtonSubject = new Subject<boolean>();

  private newNoteIsCreated: boolean;
  private previewPlaceholder: boolean;

  private formAddTagButtonIsDisabled: boolean;
  private formAddNoteButtonIsDisabled: boolean;
  private formClearNoteButtonIsDisabled: boolean;

  private titleField: boolean = false;
  private textField: boolean = false;
  private tagsField: boolean = false;

  private tagsArrayLength: number;

  constructor() { }

  initNewNoteCreation(): void {
    this.displayCreateNewNoteForm();
    this.displayPreviewPlaceholder();
    this.disableAddTagButton();
    this.disableAddNoteButton();
    this.disableClearNoteButton();
  }

  displayCreateNewNoteForm(): void {
    this.newNoteIsCreated = true;
  }
  displayEditNoteForm(): void {
    this.newNoteIsCreated = false;
  }
  displayPreviewPlaceholder(): void {
    this.previewPlaceholder = true;
  }
  disableAddTagButton(): void {
    this.formAddTagButtonIsDisabled = true;
  }
  disableAddNoteButton(): void {
    this.formAddNoteButtonIsDisabled = true;
  }
  disableClearNoteButton(): void {
    this.formClearNoteButtonIsDisabled = true;
  }

  getNewNoteIsCreatedCondition(): boolean {
    return this.newNoteIsCreated;
  }
  getPreviewPlaceholderCondition(): boolean {
    return this.previewPlaceholder;
  }
  getAddTagButtonCondition(): boolean {
    return this.formAddTagButtonIsDisabled;
  }
  getClearNoteButtonCondition(): boolean {
    return this.formClearNoteButtonIsDisabled;
  }
  getAddNoteButtonCondition(): boolean {
    return this.formAddNoteButtonIsDisabled;
  }

  isTitleFieldSet(isSet: boolean): void {
    this.titleField = (isSet) ? true : false;
    this.evaluate();
  }
  isTextFieldSet(isSet: boolean): void {
    this.textField = (isSet) ? true : false;
    this.evaluate();
  }
  isTagsFieldSet(isSet: boolean): void {
    this.tagsField = (isSet) ? true : false;
    this.evaluate();
  }
  updateTagsArrayLength(length: number): void {
    this.tagsArrayLength = length;
  }

  reset(): void {
    this.titleField = false;
    this.textField = false;
    this.tagsField = false;
    this.tagsArrayLength = 0;
    this.evaluate();
  }

  private evaluatePlaceholder(): void {
    this.previewPlaceholder = (!this.titleField && !this.textField && this.tagsArrayLength === 0 ) ? true : false;
    this.previewPlaceholderSubject.next(this.previewPlaceholder);
  }
  private evaluateFormAddTagButton(): void {
    this.formAddTagButtonIsDisabled = (!this.tagsField) ? true : false;
    this.formAddTagButtonSubject.next(this.formAddTagButtonIsDisabled);
  }
  private evaluateFormClearNoteButton(): void {
    this.formClearNoteButtonIsDisabled = (this.previewPlaceholder && !this.tagsField) ? true : false;
    this.formClearNoteButtonSubject.next(this.formClearNoteButtonIsDisabled);
  }
  private evaluateFormAddNoteButton(): void {
    this.formAddNoteButtonIsDisabled = (this.previewPlaceholder) ? true : false;
    this.formAddNoteButtonSubject.next(this.formAddNoteButtonIsDisabled);
  }

  evaluate(): void {
    this.evaluatePlaceholder();
    this.evaluateFormAddTagButton();
    this.evaluateFormAddNoteButton();
    this.evaluateFormClearNoteButton();
  }
}
