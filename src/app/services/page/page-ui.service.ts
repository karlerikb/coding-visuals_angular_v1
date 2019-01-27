import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageUIService {

  lockNotelistControlsSubject = new Subject<boolean>();

  noteFormAvailable: boolean;

  constructor() { }

  init(): void {
    this.removeNoteForm();
  }

  displayNoteForm(): void {
    this.noteFormAvailable = true;
    this.triggerLockNotelistSubject();
  }

  removeNoteForm(): void {
    this.noteFormAvailable = false;
    this.triggerLockNotelistSubject();
  }

  triggerLockNotelistSubject(): void {
    this.lockNotelistControlsSubject.next(this.noteFormAvailable);
  }

  scrollToForm() {
    const elementId = 'addOrEditNoteHeader';
    const delay = 100;
    const elementToScrollTo = document.querySelector(`#${elementId}`);

    if (elementToScrollTo) {
      setTimeout(() => {
        elementToScrollTo.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, delay);
    }
  }
}
