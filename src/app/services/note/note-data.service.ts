import { Injectable } from '@angular/core';

import { Note } from '../../models/note.model';
import { NoteConf } from '../../models/note-conf.model';
import { Snippet } from '../../models/snippet.model';

import { SnippetGeneratorService } from '../snippet/snippet-generator.service';
import { NoteUIService } from './note-ui.service';
import { PageUIService } from '../page/page-ui.service';

@Injectable({
  providedIn: 'root'
})
export class NoteDataService {

  private id: string = null;
  title: string = null;
  snippetText: string;
  snippets: Array<Snippet> = [];
  tags: Array<string> = [];

  
  constructor(
    private pageUI: PageUIService,
    private UI: NoteUIService,
    private snippetGenerator: SnippetGeneratorService) { }

  
  private generateId(pageId: string, noteIdCounter: number): void {
    this.id = `${pageId}-${noteIdCounter}`;
  }

  getId(): string {
    return this.id;
  }

  initNew(pageId: string, noteIdCounter: number): void {
    this.generateId(pageId, noteIdCounter);
  }

  private initEdit(note: Note): void {
    this.pageUI.displayNoteForm();
    this.UI.displayEditNoteForm();
    this.setEditModeValues(note);
    this.pageUI.scrollToForm();
  }

  generateSnippets(input: string): void {
    this.snippetGenerator.noteId = this.id;
    this.snippets = this.snippetGenerator.convertTextToSnippets(input);
  }

  addTag(tag: string): void {
    this.addTagToArray(tag);
    this.evaluateTagsUI();
  }

  private addTagToArray(tag: string): void {
    if (!this.tags.includes(tag)) this.tags.push(tag);
  }

  removeTag(tag: string): void {
    this.removeTagFromArray(tag);
    this.evaluateTagsUI();
  }

  private removeTagFromArray(tagToBeRemoved: string): void {
    this.tags = this.tags.filter(tag => tag !== tagToBeRemoved);
  }

  private evaluateTagsUI(): void {
    this.UI.updateTagsArrayLength(this.tags.length);
    this.UI.evaluate();
  }

  reset(): void {
    this.title = null;
    this.snippets = [];
    this.tags = [];
    this.snippetText = null;
    this.UI.reset();
  }

  editNote(note: Note) {
    this.initEdit(note);
  }

  private setEditModeValues(note: Note) {
    this.id = note.id;
    this.title = note.title;
    this.tags = note.tags;
    this.snippetText = this.snippetGenerator.convertSnippetsToText(note.snippets);
    this.snippetGenerator.reset();
  }

  prepareNote(): Note {
    const position = null;
    if (this.title == null || this.title == undefined) this.title = '';
    return new Note(this.id, this.title, this.snippets, this.tags, new NoteConf(position));
  }
}
