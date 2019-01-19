import { Component, OnInit } from '@angular/core';
import { PagePreviewService } from 'src/app/services/page-preview.service';

@Component({
  selector: 'app-edit-note-placeholder',
  templateUrl: './edit-note-placeholder.component.html',
  styleUrls: ['./edit-note-placeholder.component.css']
})
export class EditNotePlaceholderComponent implements OnInit {

  constructor(private pagePreview: PagePreviewService) { }

  ngOnInit() {
  }

  onAddNote() {
    this.pagePreview.noteEditMode = true;
    this.pagePreview.initializeNote();
  }

}
