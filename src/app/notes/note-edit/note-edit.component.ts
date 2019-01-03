import { Component, OnInit } from '@angular/core';

import { Snippet } from '../../snippet/snippet.model';
import { UnmodifiedSnippet } from '../../snippet/unmodified-snippet.model';
import { SnippetsService } from '../../snippet/snippets/snippets.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  snippets: Array<Snippet> = [];
  inputText: string;
  disableSave: boolean = false;

  constructor(private snippetsService: SnippetsService) { }

  ngOnInit() {
  }

  splitInputToArray() {
    const inputArray = this.inputText
      .replace(/(\r\n|\n|\r)/gm,"\r\n")
      .split("\r\n")
      .filter(input => input != "" && input != "*");
    this.generateSnippetObjects(inputArray);
  }

  generateSnippetObjects(snippets: Array<string>) {
    const snippetObjects: Array<UnmodifiedSnippet> = [];

    snippets.forEach(snippet => {
      let categorisedSnippet = this.categoriseSnippet(snippet.trim());
      snippetObjects.push(categorisedSnippet);
    });
    this.snippets = this.snippetsService.mutateSnippetArray(snippetObjects);
  }

  categoriseSnippet(snippet: string) {
    if (snippet.startsWith("*")) {
      let cleanedSnippet = snippet.substring(1).trim();
      return new UnmodifiedSnippet('list', cleanedSnippet); // { type: 'list', contents: cleanedSnippet }
    }
    return new UnmodifiedSnippet('text', snippet); // { type: 'text', contents: snippet };
  }

  onInputChange(notesInput, event) {
    if (notesInput.value == "") {
      this.snippets = [];
    }
  }

}
