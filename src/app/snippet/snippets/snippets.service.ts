import { Injectable } from '@angular/core';

import { Snippet } from '../snippet.model';
import { UnmodifiedSnippet } from '../unmodified-snippet.model';

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {

  private snippetsArray: Array<UnmodifiedSnippet> = [];

  // List flags
  private nextIsList: boolean;
  private prevIsList: boolean;
  private isList: boolean;
  private listHeaderText: boolean = false;
  
  constructor() { }
  
  mutateSnippetArray(snippetsArray: Array<UnmodifiedSnippet>): Array<Snippet> {
    this.snippetsArray = snippetsArray;
    const mutatedSnippetsArray: Array<Snippet> = [];
    let listContentsArray: Array<string> = [];

    this.snippetsArray.forEach((snippet, index) => {
      this.setListSnippetFlags(snippet, index);

      if (this.isList) {
        let listContent = snippet.contents;
        listContentsArray.push(listContent);

        if (!this.nextIsList) {
          let listObject: Snippet;

          if (this.listHeaderText) {
            listObject = new Snippet(snippet.type, listContentsArray, { preList: true }); // { type: snippet.type, contents: listContentsArray };
            this.listHeaderText = false;
          } else {
            listObject = new Snippet(snippet.type, listContentsArray);
          }
          mutatedSnippetsArray.push(listObject);
          listContentsArray = [];
        }
      } else {
        
        if (this.nextIsList && snippet.contents.endsWith(":")) {
          let listHeaderText = snippet.contents;
          // let textObject = new Snippet(snippet.type, [snippet.contents], { preList: true });
          listContentsArray.push(listHeaderText);
          this.listHeaderText = true;
        } else {
          let textObject = new Snippet(snippet.type, [snippet.contents]); // { type: snippet.type, contents: [snippet.contents] };
          mutatedSnippetsArray.push(textObject);
        }
      }
      console.log(snippet, index, this.nextIsList, this.prevIsList, this.isList);
    });
    console.log(mutatedSnippetsArray);
    return mutatedSnippetsArray.slice();
  }

  setListSnippetFlags(snippet: UnmodifiedSnippet, index: number): void {
    this.isList = (snippet.type === 'list') ? true : false;

    if (index === 0) {
      this.setFirstSnippetListFlags(index, this.snippetsArray.length);
    } else if (index === this.snippetsArray.length - 1) {
      this.setLastSnippetListFlags(index);
    } else {
      this.setBetweenFirstAndLastSnippetListFlags(index);
    }
  }

  setFirstSnippetListFlags(index: number, arrayLength: number): void {
    if (arrayLength > 1) {
      let next = this.snippetsArray[index + 1].type;
      this.prevIsList = false;
      this.nextIsList = (next === 'list') ? true : false;
    } else {
      this.prevIsList = false;
      this.nextIsList = false;
    }
  }

  setLastSnippetListFlags(index: number): void {
    let prev = this.snippetsArray[index - 1].type;
    this.prevIsList = (prev === 'list') ? true : false;
    this.nextIsList = false;
  }

  setBetweenFirstAndLastSnippetListFlags(index: number): void {
    let prev = this.snippetsArray[index - 1].type;
    let next = this.snippetsArray[index + 1].type;
    this.prevIsList = (prev === 'list') ? true : false;
    this.nextIsList = (next === 'list') ? true : false;
  }


  
}
