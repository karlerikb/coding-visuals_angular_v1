import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private snippetsArray: Array<{ type: string, contents: string }> = [
    { type: 'text', contents: 'test text 1' },
    { type: 'list', contents: 'test list item 1' },
    { type: 'list', contents: 'test list item 2' },
    { type: 'text', contents: 'test text 2' },
    { type: 'text', contents: 'test text 3' },
    { type: 'list', contents: 'test list item 3' },
    { type: 'text', contents: 'test text 4' },
/*     { type: 'list', contents: 'test list item 4' },
    { type: 'list', contents: 'test list item 5' },
    { type: 'list', contents: 'test list item 6' },
    { type: 'text', contents: 'test text 5' } */
  ];

  
  // List flags
  private nextIsList: boolean;
  private prevIsList: boolean;
  private isList: boolean;
  
  constructor() { }
  
  mutateSnippetArray(snippetsArray: Array<{ type: string, contents: string }>): Array<{ type: string, contents: Array<string> }> {
    this.snippetsArray = snippetsArray;
    const mutatedSnippetsArray: Array<{ type: string, contents: Array<string> }> = [];
    let listContentsArray: Array<string> = [];

    this.snippetsArray.forEach((snippet, index) => {
      this.setListSnippetFlags(snippet, index);

      if (this.isList) {
        let listContent = snippet.contents;
        listContentsArray.push(listContent);

        if (!this.nextIsList) {
          let listObject = { type: snippet.type, contents: listContentsArray };
          mutatedSnippetsArray.push(listObject);
          listContentsArray = [];
        }
      } else {
        let textObject = { type: snippet.type, contents: [snippet.contents] };
        mutatedSnippetsArray.push(textObject);
      }
      console.log(snippet, index, this.nextIsList, this.prevIsList, this.isList);
    });
    console.log(mutatedSnippetsArray);
    return mutatedSnippetsArray.slice();
  }

  setListSnippetFlags(snippet: { type: string, contents: string }, index: number) {
    this.isList = (snippet.type === 'list') ? true : false;

    if (index === 0) {
      this.setFirstSnippetListFlags(index);
    } else if (index === this.snippetsArray.length - 1) {
      this.setLastSnippetListFlags(index);
    } else {
      this.setBetweenFirstAndLastSnippetListFlags(index);
    }
  }

  setFirstSnippetListFlags(index: number) {
    let next = this.snippetsArray[index + 1].type;
    this.prevIsList = false;
    this.nextIsList = (next === 'list') ? true : false;
  }

  setLastSnippetListFlags(index: number) {
    let prev = this.snippetsArray[index - 1].type;
    this.prevIsList = (prev === 'list') ? true : false;
    this.nextIsList = false;
  }

  setBetweenFirstAndLastSnippetListFlags(index: number) {
    let prev = this.snippetsArray[index - 1].type;
    let next = this.snippetsArray[index + 1].type;
    this.prevIsList = (prev === 'list') ? true : false;
    this.nextIsList = (next === 'list') ? true : false;
  }


  
}
