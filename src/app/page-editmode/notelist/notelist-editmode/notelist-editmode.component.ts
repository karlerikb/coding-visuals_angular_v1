import { Component, OnInit } from '@angular/core';
import { PageDataService } from 'src/app/services/page/page-data.service';

@Component({
  selector: 'app-notelist-editmode',
  templateUrl: './notelist-editmode.component.html',
  styleUrls: ['./notelist-editmode.component.css']
})
export class NotelistEditmodeComponent implements OnInit {

  constructor(private pageData: PageDataService) { }

  ngOnInit() {
  }

}