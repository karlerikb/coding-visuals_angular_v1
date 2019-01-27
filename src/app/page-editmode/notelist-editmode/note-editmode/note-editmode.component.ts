import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Note } from 'src/app/models/note.model';
import { Snippet } from 'src/app/models/snippet.model';

import { SnippetDataService } from 'src/app/services/snippet/snippet-data.service';
import { NoteDataService } from 'src/app/services/note/note-data.service';
import { PageDataService } from 'src/app/services/page/page-data.service';
import { PageUIService } from 'src/app/services/page/page-ui.service';

@Component({
  selector: 'app-note-editmode',
  templateUrl: './note-editmode.component.html',
  styleUrls: ['./note-editmode.component.css'],
  providers: [SnippetDataService]
})
export class NoteEditmodeComponent implements OnInit, OnDestroy {

  @Input() note: Note;

  private notePositionSubscription: Subscription;
  private removeSnippetSubscription: Subscription;
  private lockNotelistControlsSubscription: Subscription;

  noteDetailsOpen: boolean;
  firstNote: boolean;
  lastNote: boolean;
  lockControls: boolean;

  constructor(
    private snippetData: SnippetDataService,
    private NoteData: NoteDataService,
    private pageData: PageDataService,
    private pageUI: PageUIService) { }

  ngOnInit() {
    this.onCloseNoteDetails();
    this.firstNote = (this.note.conf.position === 1) ? true : false;
    this.lastNote = (this.note.conf.position === this.pageData.notes.length) ? true : false;
    this.notePositionSubscription = this.pageData.notePositionSubject.subscribe(
      () => {
        this.firstNote = (this.note.conf.position === 1) ? true : false;
        this.lastNote = (this.note.conf.position === this.pageData.notes.length) ? true : false;
      }
    );
    this.removeSnippetSubscription = this.snippetData.removeSnippetSubject.subscribe(
      (snippets: Array<Snippet>) => {
        this.note.snippets = snippets;
      }
    );
    this.lockNotelistControlsSubscription = this.pageUI.lockNotelistControlsSubject.subscribe(
      (condition: boolean) => {
        this.onCloseNoteDetails();
        this.lockControls = condition;
      }
    );
  }

  onOpenNoteDetails(): void {
    this.noteDetailsOpen = true;
  }

  onCloseNoteDetails(): void {
    this.noteDetailsOpen = false;
  }

  onMoveNoteUp(): void {
    this.moveNote('up');
  }

  onMoveNoteDown(): void {
    this.moveNote('down');
  }

  moveNote(direction: string): void {
    let noteToBeSwitchedPos: number;
    const currentNotePos = this.note.conf.position;
    if (direction === 'up') noteToBeSwitchedPos = currentNotePos - 1;
    if (direction === 'down') noteToBeSwitchedPos = currentNotePos + 1;
    this.pageData.switchNotePositions(currentNotePos, noteToBeSwitchedPos);
  }

  onRemoveNote(): void {
    const confirmRemove = confirm('Sure you want to remove this note?');
    if (confirmRemove) this.pageData.removeNoteFromPage(this.note.id);
  }

  onEditNote() {
    this.NoteData.editNote(this.note);
  }

  ngOnDestroy() {
    this.notePositionSubscription.unsubscribe();
    this.removeSnippetSubscription.unsubscribe();
    this.lockNotelistControlsSubscription.unsubscribe();
  }
}
