import { Component, OnInit } from '@angular/core';
import { PagePreviewService } from '../services/page-preview.service';

@Component({
  selector: 'app-page-editmode',
  templateUrl: './page-editmode.component.html',
  styleUrls: ['./page-editmode.component.css']
})
export class PageEditmodeComponent implements OnInit {

  constructor(
    private pagePreview: PagePreviewService) { }

  ngOnInit() {
    this.pagePreview.initializePreview();
  }

}
