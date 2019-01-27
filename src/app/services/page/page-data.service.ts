import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Note } from '../../models/note/note.model';

import { PagesService } from './pages.service';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {

  notePositionSubject = new Subject();

  private noteIdCounter: number;

  private id: string;
  title: string;
  notes: Array<Note> = [
    // new Note('1-2', 'teine pealkiri', [new Snippet('1-2-1', 'text', ['tekst 1'], new SnippetConf(1, null)), new Snippet('1-2-2', 'list', ['tekst 2:', 'list 1', 'list 2'], new SnippetConf(2, true)), new Snippet('1-2-3', 'text', ['text 2'], new SnippetConf(3, null)), new Snippet('1-2-4', 'list', ['list 3', 'list 4'], new SnippetConf(4, null))], ['tag 1', 'tag 2'], new NoteConf(2)),
    // new Note('1-1', 'esimene pealkiri', [new Snippet('1-1-1', 'text', ['tekst 1'], new SnippetConf(1, null)), new Snippet('1-1-2', 'text', ['tekst 2'], new SnippetConf(2, null)), new Snippet('1-1-3', 'text', ['tekst 3'], new SnippetConf(3, null))], ['tag 1', 'tag 2'], new NoteConf(1)),
    // new Note('1-3', 'kolmas pealkiri', [new Snippet('1-3-1', 'text', ['tekst 1'], new SnippetConf(1, null)), new Snippet('1-3-2', 'text', ['tekst 2'], new SnippetConf(2, null))], ['tag 1', 'tag 2'], new NoteConf(3))
  ];

  constructor(private pages: PagesService) { }

  
  private generateId(): void {
    const currentPageArrayLength = this.pages.getPages().length;
    this.id = `${currentPageArrayLength + 1}`;
  }

  getId(): string {
    return this.id;
  }

  setNoteIdCounter(): void {
    this.noteIdCounter = this.notes.length + 1;
  }

  getNoteIdCounter(): number {
    return this.noteIdCounter;
  }

  init(): void {
    this.generateId();
    this.setNoteIdCounter();
    this.orderNotesByPosition();
  }

  addNoteToPage(note: Note): void {
    this.pushNoteToArray(note);
    this.orderNotesByPosition();
    this.noteIdCounter++;
  }

  pushNoteToArray(note: Note): void {
    note.conf.position = this.notes.length + 1;
    this.notes.push(note);
  }

  removeNoteFromPage(noteId: string): void {
    this.removeNoteFromArray(noteId);
    this.updateNotePositions();
    this.orderNotesByPosition();
  }

  removeNoteFromArray(noteId: string): void {
    this.notes = this.notes.filter(note => note.id !== noteId);
  }

  updateNotePositions(): void {
    this.notes.forEach((note, index) => {
      note.conf.position = index + 1;
    });
  }

  switchNotePositions(currentPos: number, newPos: number): void {
    const currentNote = this.notes.find(note => { return note.conf.position === currentPos });
    const noteToBeSwitched = this.notes.find(note => { return note.conf.position === newPos });
    currentNote.conf.position = newPos;
    noteToBeSwitched.conf.position = currentPos;
    this.orderNotesByPosition();
  }

  orderNotesByPosition(): void {
    this.notes = this.notes.sort((a, b) => {
      return a.conf.position - b.conf.position;
    });
    this.notePositionSubject.next();
  }
}
