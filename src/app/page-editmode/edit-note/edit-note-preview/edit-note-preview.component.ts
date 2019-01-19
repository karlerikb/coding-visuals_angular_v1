import { Component, OnInit } from '@angular/core';
import { NotePreviewService } from 'src/app/services/note-preview.service';

@Component({
  selector: 'app-edit-note-preview',
  templateUrl: './edit-note-preview.component.html',
  styleUrls: ['./edit-note-preview.component.css']
})
export class EditNotePreviewComponent implements OnInit {

  constructor(private notePreview: NotePreviewService) { }

  ngOnInit() {
  }

  onRemoveTag(tagToBeDeleted: string) {
    this.notePreview.removeTag(tagToBeDeleted);
  }

}
