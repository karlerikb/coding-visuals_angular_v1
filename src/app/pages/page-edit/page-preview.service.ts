import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagePreviewService {

  pageNotes: Array<number> = [];

  constructor() { }
}
