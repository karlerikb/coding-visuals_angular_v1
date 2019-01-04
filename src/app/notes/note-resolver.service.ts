import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Note } from './note.model';
import { NotesService } from './notes.service';

@Injectable()
export class NoteResolverService implements Resolve<Note> {

  constructor(private notesService: NotesService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Note> | Promise<Note> | Note {
      return this.notesService.getSingleNote(+route.params['id']);
  }
}