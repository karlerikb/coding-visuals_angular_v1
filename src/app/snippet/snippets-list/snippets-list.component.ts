import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { NotePreviewService } from 'src/app/notes/note-edit/note-preview.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snippets-list',
  templateUrl: './snippets-list.component.html',
  styleUrls: ['./snippets-list.component.css']
})
export class SnippetsListComponent implements OnInit, OnDestroy {

  @Input() title: string;

  private subscription: Subscription;
  setPlaceholder: boolean;

  constructor(private notePreviewService: NotePreviewService) { }

  ngOnInit() {
    this.setPlaceholder = this.notePreviewService.getPlaceholderCondition();
    this.subscription = this.notePreviewService.formFieldFlagsChanged.subscribe(
      (condition: boolean) => {
        this.setPlaceholder = condition;
      }
    );
  }

  deleteTag(toBeDeletedTag: string) {
    this.notePreviewService.tags = this.notePreviewService.tags.filter(tag => tag !== toBeDeletedTag );
    if (this.notePreviewService.tags.length > 0) {
      this.notePreviewService.setTags(true);
    } else {
      this.notePreviewService.setTags(false);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
