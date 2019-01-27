import { Injectable } from '@angular/core';

import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private pages: Array<Page> = [];

  constructor() { }

  getPages() {
    return this.pages.slice();
  }
}
