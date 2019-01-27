import { Component, OnInit } from '@angular/core';
import { NoteDataService } from 'src/app/services/note/note-data.service';

@Component({
  selector: 'app-edit-note-preview',
  templateUrl: './edit-note-preview.component.html',
  styleUrls: ['./edit-note-preview.component.css']
})
export class EditNotePreviewComponent implements OnInit {

  constructor(private noteData: NoteDataService) { }

  ngOnInit() {
  }

  onRemoveTag(tagToBeRemoved: string) {
    this.noteData.removeTag(tagToBeRemoved);
  }
}
