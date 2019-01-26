import { Component, OnInit } from '@angular/core';

import { PagePreviewService } from '../services/page-preview.service';
import { PagePreviewUiService } from '../services/page-preview-ui.service';
import { NotePreviewService } from '../services/note-preview.service';
import { NotePreviewUiService } from '../services/note-preview-ui.service';

@Component({
  selector: 'app-page-editmode',
  templateUrl: './page-editmode.component.html',
  styleUrls: ['./page-editmode.component.css'],
  providers: [PagePreviewService, PagePreviewUiService, NotePreviewService, NotePreviewUiService]
})
export class PageEditmodeComponent implements OnInit {

  constructor(
    private pagePreview: PagePreviewService,
    private pagePreviewUI: PagePreviewUiService,
    private notePreview: NotePreviewService) { }

  ngOnInit() {
    this.pagePreview.init();
    this.pagePreviewUI.init();
  }
}
