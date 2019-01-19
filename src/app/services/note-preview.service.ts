import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Snippet } from '../models/snippet.model';
import { NoteService } from './note.service';
import { SnippetService } from './snippet.service';

@Injectable({
  providedIn: 'root'
})
export class NotePreviewService {

  notePlaceholder = new Subject<boolean>();
  formTagButton = new Subject<boolean>();
  clearNoteButton = new Subject<boolean>();

  id: string;
  title: string;
  snippets: Array<Snippet> = [];
  tags: Array<string> = [];

  newNoteIsCreated: boolean = false;

  private titleField: boolean = false;
  private textField: boolean = false;
  private tagsField: boolean = false;

  private placeholder: boolean = true;
  private tagButtonDisabled: boolean = true;
  private clearNoteButtonDisabled: boolean = false;


  constructor(
    private noteService: NoteService,
    private snippetService: SnippetService) { }

  generateNoteId(pageId: number) {
    const currentNoteArrayLength = this.noteService.getNotes().length;
    this.id = `${pageId}-${currentNoteArrayLength + 1}`;
  }

  generateNoteSnippets(input: string) {
    this.snippetService.noteId = this.id;
    this.snippets = this.snippetService.generateSnippets(input);
  }

  addTag(tag: string) {
    if (!this.tags.includes(tag)) this.tags.push(tag);
    this.evaluatePlaceholder();
  }

  removeTag(tagToBeDeleted: string) {
    this.tags = this.tags.filter(tag => tag !== tagToBeDeleted);
    this.evaluatePlaceholder();
  }

  isTitleFieldSet(isSet: boolean) {
    this.titleField = (isSet) ? true : false;
    this.evaluatePlaceholder();
  }

  isTextFieldSet(isSet: boolean) {
    this.textField = (isSet) ? true : false;
    this.evaluatePlaceholder();
  }

  isTagsFieldSet(isSet: boolean) {
    this.tagsField = (isSet) ? true : false;
    this.evaluatePlaceholder();
  }

  clearPreview() {
    this.id = null;
    this.title = null;
    this.snippets = [];
    this.tags = [];
    this.titleField = false;
    this.textField = false;
    this.tagsField = false;
    this.evaluatePlaceholder();
  }

  private evaluatePlaceholder() {
    this.placeholder = (!this.titleField && !this.textField && this.tags.length === 0 ) ? true : false;
    this.notePlaceholder.next(this.placeholder);

    this.tagButtonDisabled = (!this.tagsField) ? true : false;
    this.formTagButton.next(this.tagButtonDisabled);

    this.clearNoteButtonDisabled = (this.placeholder && !this.tagsField) ? true : false;
    this.clearNoteButton.next(this.clearNoteButtonDisabled);
  }

}
