import { Injectable } from '@angular/core';

import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: Array<Note> = [];

  constructor() { }

  getNotes(): Array<Note> {
    return this.notes.slice();
  }
}
