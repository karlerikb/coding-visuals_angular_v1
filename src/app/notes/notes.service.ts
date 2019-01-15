import { Injectable } from '@angular/core';

import { Note } from './note.model';
import { Snippet } from '../snippet/snippet.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Array<Note> = [
    new Note(1, 'Test Title 1', [
      new Snippet('text', ['test text 1']),
      new Snippet('list', ['test list item 1', 'test list item 2'])
    ], ['tag 1', 'tag 2', 'tag 3']),
    new Note(2, 'Test Title 2', [
      new Snippet('text', ['test text 1']),
      new Snippet('list', ['test list item 1 header:', 'test list item 2'], { preList: true })
    ], ['tag 1', 'tag 2']),
    new Note(3, 'Test Title 3', [
      new Snippet('text', ['test text 1']),
      new Snippet('list', ['test list item 1', 'test list item 2']),
      new Snippet('text', ['test text 2']),
      new Snippet('text', ['test text 1']),
      new Snippet('list', ['test list item 1', 'test list item 2']),
      new Snippet('text', ['test text 2']),
      new Snippet('text', ['test text 1']),
      new Snippet('list', ['test list item 1', 'test list item 2']),
      new Snippet('text', ['test text 2']),
      new Snippet('text', ['test text 1']),
      new Snippet('list', ['test list item 1', 'test list item 2']),
      new Snippet('text', ['test text 2']),
      new Snippet('text', ['test text 1']),
      new Snippet('list', ['test list item 1', 'test list item 2']),
      new Snippet('text', ['test text 2']),
      new Snippet('text', ['test text 1']),
      new Snippet('list', ['test list item 1', 'test list item 2']),
      new Snippet('text', ['test text 2']),
      new Snippet('text', ['test text 1']),
      new Snippet('list', ['test list item 1', 'test list item 2']),
      new Snippet('text', ['test text 2']),
    ], ['tag 1', 'tag 2', 'tag 3', 'tag 4'])
  ];

  

  constructor() { }

  getNotes() {
    return this.notes.slice();
  }

  getSingleNote(index: number) {
    return this.notes.slice()[index];
  }

  addNote(note: Note) {
    this.notes.push(note);
  }
}
