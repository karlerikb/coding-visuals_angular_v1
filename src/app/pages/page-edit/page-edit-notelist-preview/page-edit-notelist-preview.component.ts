import { Component, OnInit } from '@angular/core';
import { PagePreviewService } from '../page-preview.service';

@Component({
  selector: 'app-page-edit-notelist-preview',
  templateUrl: './page-edit-notelist-preview.component.html',
  styleUrls: ['./page-edit-notelist-preview.component.css']
})
export class PageEditNotelistPreviewComponent implements OnInit {

  constructor(
    private pagePreviewService: PagePreviewService) { }

  ngOnInit() {
  }

}
