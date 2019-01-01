import { Component, OnInit } from '@angular/core';

import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  snippets: Array<{ type: string, contents: Array<string> }> = [];
  inputText: string;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
  }

  splitInputToArray() {
    const inputArray = this.inputText.replace(/(\r\n|\n|\r)/gm,"\r\n").split("\r\n");
    this.generateSnippetObjects(inputArray);
  }

  generateSnippetObjects(snippets: Array<string>) {
    const snippetObjects: Array<{ type: string, contents: string }> = [];

    snippets.forEach(snippet => {
      let categorisedSnippet = this.categoriseSnippet(snippet.trim());
      snippetObjects.push(categorisedSnippet);
    });
    this.snippets = this.notesService.mutateSnippetArray(snippetObjects);
  }

  categoriseSnippet(snippet: string) {
    if (snippet.startsWith("*")) {
      let cleanedSnippet = snippet.substring(1).trim();
      return { type: 'list', contents: cleanedSnippet }
    }
    return { type: 'text', contents: snippet };
  }





  // parseInput() {
  //   const array = this.inputText.replace(/(\r\n|\n|\r)/gm,"§§§").split("§§§");
  //   this.generateElements(array);
  //   // this.generateListItems(this.elements);
  // }

  // generateElements(elements) {
  //   const objects = [];

  //   elements.forEach(element => {
  //     objects.push(this.categoriseElement(element.trim()));
  //   });
  //   this.elements = objects;
  // }

  // categoriseElement(element) {
  //   if (element.startsWith("*")) {
  //     return { type: 'list', content: element };
  //   }
  //   return { type : 'text', content: element };
  // }

  // generateListItems(elements) {
  //   const array = [];
  //   let previousIsList: boolean = false;
  //   let nextIsList: boolean = false;
  //   let listArray = [];

  //   console.log(elements.length);

  //   elements.forEach((element, index) => {

  //     console.log(element.type);

  //     if (index === 0) {
  //       previousIsList = false;
  //       nextIsList = (elements[index++].type) === 'list' ? true : false;
  //     }
  //     if (index === elements.length - 1) {
  //       previousIsList = (elements[index - 1].type) === 'list' ? true : false;
  //       nextIsList = false;
  //     }

  //     if (index > 0 && index < elements.length - 1) {
  //       previousIsList = (elements[--index].type) === 'list' ? true : false;
  //       nextIsList = (elements[++index].type) === 'list' ? true : false;
  //     }
  //     console.log(previousIsList, nextIsList);

  //     if (element.type === 'text') {
  //       array.push(element);
  //     }
  //     if (element.type === 'list') {
  //       listArray.push(element.content);
  //       if (!previousIsList && !nextIsList) {
  //         array.push({
  //           type: element.type,
  //           content: [element.content]
  //         });
  //       }
  //       if (!nextIsList) {
  //         array.push({
  //           type: element.type,
  //           content: listArray
  //         });
  //         listArray = [];
  //       }
  //     }
  //   });
  //   console.log(array);
  //   this.elements = array;
  // }

}