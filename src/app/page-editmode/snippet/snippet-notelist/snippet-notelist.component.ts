import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Snippet } from 'src/app/models/snippet/snippet.model';
import { SnippetDataService } from 'src/app/services/snippet/snippet-data.service';


@Component({
  selector: 'app-snippet-notelist',
  templateUrl: './snippet-notelist.component.html',
  styleUrls: ['./snippet-notelist.component.css']
})
export class SnippetNotelistComponent implements OnInit, OnDestroy {

  @Input() snippet: Snippet;
  @Input() snippetArrayLength: number;
  @Input() noteDetailsOpen: boolean;

  noteSubscription: Subscription;

  snippetDetailsOpen: boolean = false;
  firstSnippet: boolean;
  lastSnippet: boolean;
  hoverActive: boolean;

  listSnippet: { listWithHeader: boolean, header: string, list: Array<string>} = {
    listWithHeader: null,
    header: null,
    list: null
  }
  textSnippet: string;

  constructor(private snippetData: SnippetDataService) { }

  ngOnInit() {
    this.firstSnippet = (this.snippet.conf.position === 1) ? true : false;
    this.lastSnippet = (this.snippet.conf.position === this.snippetArrayLength) ? true : false;

    this.noteSubscription = this.snippetData.noteSubject.subscribe(
      (snippetArrayLength) => {
        this.firstSnippet = (this.snippet.conf.position === 1) ? true : false;
        this.lastSnippet = (this.snippet.conf.position === snippetArrayLength) ? true : false;
      }
    );
    if (this.snippet.type === 'text') this.setTextSnippet();
    if (this.snippet.type === 'list') this.setListSnippet();
  }

  setTextSnippet(): void {
    this.textSnippet = this.snippet.contents[0];
  }

  setListSnippet(): void {
    const contents = this.snippet.contents;
    if (this.snippet.conf['headerList']) {
      let headerFlag = true;
      let header = contents[0];
      let list = contents.slice(1);
      this.configureListSnippetObject(headerFlag, header, list);
    } else {
      let headerFlag = false;
      let header = '';
      let list = contents.slice();
      this.configureListSnippetObject(headerFlag, header, list);
    }
  }

  configureListSnippetObject(headerFlag: boolean, header: string, list: Array<string>): void {
    this.listSnippet.listWithHeader = headerFlag;
    this.listSnippet.header = header;
    this.listSnippet.list = list;
  }

  onOpenSnippetDetails(): void {
    this.snippetDetailsOpen = true;
  }

  onCloseSnippetDetails(): void {
    this.snippetDetailsOpen = false;
  }

  onSwitchSnippetDetails(): void {
    this.snippetDetailsOpen = !this.snippetDetailsOpen;
  }

  onMoveSnippetUp(): void {
    const currentSnippetPos = this.snippet.conf.position;
    const snippetToBeSwitchedPos = currentSnippetPos - 1;
    this.snippetData.switchSnippetPositions(this.snippet.id, currentSnippetPos, snippetToBeSwitchedPos);
  }

  onMoveSnippetDown(): void {
    const currentSnippetPos = this.snippet.conf.position;
    const snippetToBeSwitchedPos = currentSnippetPos + 1;
    this.snippetData.switchSnippetPositions(this.snippet.id, currentSnippetPos, snippetToBeSwitchedPos);
  }

  onRemoveSnippet(): void {
    const confirmRemove = confirm('Sure you want to remove this snippet?');
    if (confirmRemove) this.snippetData.removeSnippet(this.snippet.id);
  }

  onMouseEnter(): void {
    this.hoverActive = true;
  }

  onMouseLeave(): void {
    this.hoverActive = false;
  }

  ngOnDestroy() {
    this.noteSubscription.unsubscribe();
  }
}
