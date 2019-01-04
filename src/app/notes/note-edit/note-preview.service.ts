import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Snippet } from 'src/app/snippet/snippet.model';
import { Note } from '../note.model';

@Injectable({
  providedIn: 'root'
})
export class NotePreviewService {

  formFieldFlagsChanged = new Subject<boolean>();
  saveBtnValidationChanged = new Subject<boolean>();

  title: string;
  snippets: Array<Snippet> = [];
  tags: Array<string> = [];

  private titleIsSet: boolean = false;
  private inputBodyIsSet: boolean = false;
  private tagsAreSet: boolean = false;
  private setPlaceholder: boolean = true;
  private saveBtnAllowed: boolean = false;

  constructor() { }

  setTitle(set: boolean): void {
    this.titleIsSet = (set) ? true : false;
    this.evaluatePlaceholderCondition();
  }

  setInputBody(set: boolean): void {
    this.inputBodyIsSet = (set) ? true : false;
    this.evaluatePlaceholderCondition();
  }

  setTags(set: boolean): void {
    this.tagsAreSet = (set) ? true : false;
    this.evaluatePlaceholderCondition();
  }

  evaluatePlaceholderCondition(): void {
    this.setPlaceholder = (!this.titleIsSet && !this.inputBodyIsSet && !this.tagsAreSet) ? true : false;
    this.saveBtnAllowed = (this.titleIsSet && this.inputBodyIsSet) ? true : false;
    this.formFieldFlagsChanged.next(this.setPlaceholder);
    this.saveBtnValidationChanged.next(this.saveBtnAllowed);
  }

  resetPreview(): void {
    this.titleIsSet = false;
    this.inputBodyIsSet = false;
    this.tagsAreSet = false;
    this.title = null;
    this.snippets = [];
    this.tags = [];
    this.evaluatePlaceholderCondition();
  }

  prepareNote(): Note {
    return new Note(this.title, this.snippets, this.tags);
  }

  getPlaceholderCondition(): boolean {
    return this.setPlaceholder;
  }
}
