import { Component, OnInit } from '@angular/core';

import { PageDataService } from '../services/page/page-data.service';
import { PageUIService } from '../services/page/page-ui.service';
import { NoteDataService } from '../services/note/note-data.service';
import { NoteUIService } from '../services/note/note-ui.service';

@Component({
  selector: 'app-page-editmode',
  templateUrl: './page-editmode.component.html',
  styleUrls: ['./page-editmode.component.css'],
  providers: [PageDataService, PageUIService, NoteDataService, NoteUIService]
})
export class PageEditmodeComponent implements OnInit {

  constructor(
    private pageData: PageDataService,
    private pageUI: PageUIService) { }

  ngOnInit() {
    this.pageData.init();
    this.pageUI.init();
  }
}
