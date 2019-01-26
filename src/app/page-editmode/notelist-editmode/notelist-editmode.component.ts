import { Component, OnInit } from '@angular/core';
import { PagePreviewService } from 'src/app/services/page-preview.service';

@Component({
  selector: 'app-notelist-editmode',
  templateUrl: './notelist-editmode.component.html',
  styleUrls: ['./notelist-editmode.component.css']
})
export class NotelistEditmodeComponent implements OnInit {

  constructor(private pageData: PagePreviewService) { }

  ngOnInit() {
  }

}
