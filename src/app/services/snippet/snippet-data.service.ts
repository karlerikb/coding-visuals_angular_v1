import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Snippet } from '../../models/snippet.model';

import { PageDataService } from '../page/page-data.service';

@Injectable({
  providedIn: 'root'
})
export class SnippetDataService {

  noteSubject = new Subject<number>();
  removeSnippetSubject = new Subject<Array<Snippet>>();

  constructor(private pageData: PageDataService) { }

  switchSnippetPositions(snippetId: string, currentPos: number, newPos: number): void {
    const snippets = this.getCurrentNoteSnippets(snippetId);
    this.switchSnippets(snippets, currentPos, newPos);
    this.orderNoteSnippets(snippets);
  }

  private switchSnippets(snippets: Array<Snippet>, currentPos: number, newPos: number): void {
    const currentSnippet = snippets.find(snippet => snippet.conf.position === currentPos);
    const snippetToBeMoved = snippets.find(snippet => snippet.conf.position === newPos);
    currentSnippet.conf.position = newPos;
    snippetToBeMoved.conf.position = currentPos;
  }

  private getCurrentNoteSnippets(snippetId: string): Array<Snippet> {
    const currentNoteId = this.getCurrentNoteId(snippetId);
    const currentNote = this.pageData.notes.find(note => note.id === currentNoteId);
    return currentNote.snippets;
  }

  private getCurrentNoteId(snippetId: string): string {
    const snippetIdArray = snippetId.split('-');
    const currentNoteId = `${snippetIdArray[0]}-${snippetIdArray[1]}`;
    return currentNoteId;
  }

  private orderNoteSnippets(snippets: Array<Snippet>): void {
    snippets = snippets.sort((a, b) => {
      return a.conf.position - b.conf.position;
    });
    this.noteSubject.next(snippets.length);
  }

  removeSnippet(snippetId: string): void {
    let snippets = this.getCurrentNoteSnippets(snippetId);
    snippets = this.removeSnippetFromArray(snippets, snippetId);
    snippets = this.updateSnippetPositions(snippets);
    this.triggerRemoveSnippetSubjects(snippets);
  }

  private removeSnippetFromArray(snippets: Array<Snippet>, snippetId: string): Array<Snippet> {
    const snippetsArray = snippets.filter(snippet => snippet.id !== snippetId);
    return snippetsArray;
  }

  private updateSnippetPositions(snippets: Array<Snippet>): Array<Snippet> {
    snippets.forEach((snippet, index) => snippet.conf.position = index + 1);
    return snippets;
  }

  private triggerRemoveSnippetSubjects(snippets: Array<Snippet>): void {
    this.removeSnippetSubject.next(snippets);
    this.noteSubject.next(snippets.length);
  }
}
