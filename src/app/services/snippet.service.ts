import { Injectable } from '@angular/core';

import { UnmodifiedSnippet } from '../models/unmodified-snippet.model';
import { Snippet } from '../models/snippet.model';
import { SnippetConf } from '../models/snippet-conf.model';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  noteId: string;
  private snippets: Array<UnmodifiedSnippet> = [];
  private snippetString: string = '';

  // List flags
  private nextIsList: boolean;
  private prevIsList: boolean;
  private isList: boolean;
  private listHeaderText: boolean = false;

  constructor() { }

  private inputToArray(inputText: string): Array<string> {
    const inputArray: Array<string> = inputText
      .trim()
      .replace(/(\r\n|\n|\r)/gm,'\r\n')
      .split('\r\n')
      .filter(input => input != '' && input != '*');
    return inputArray;
  }

  private generateSnippetObjectsArray(inputArray: Array<string>): Array<UnmodifiedSnippet> {
    const snippetObjects: Array<UnmodifiedSnippet> = [];
    inputArray.forEach(snippet => {
      let categorisedSnippet: UnmodifiedSnippet = this.categoriseSnippet(snippet.trim());
      snippetObjects.push(categorisedSnippet);
    });
    return snippetObjects;
  }

  private categoriseSnippet(snippet: string): UnmodifiedSnippet {
    if (snippet.startsWith('*')) {
      let listSnippet = snippet.substring(1).trim();
      return new UnmodifiedSnippet('list', listSnippet);
    }
    return new UnmodifiedSnippet('text', snippet);
  }

  private modifySnippets(snippets: Array<UnmodifiedSnippet>): Array<Snippet> {
    this.snippets = snippets;
    const modifiedSnippetsArray: Array<Snippet> = [];
    const tempSnippetId = '0';
    const params = [null, null];
    let listContentsArray: Array<string> = [];

    snippets.forEach((snippet, index) => {
      this.setListSnippetFlags(snippet, index);

      if (this.isList) {
        let listContent = snippet.contents;
        listContentsArray.push(listContent);

        if (!this.nextIsList) {
          let listObject: Snippet;

          if (this.listHeaderText) {
            listObject = new Snippet(tempSnippetId, snippet.type, listContentsArray, new SnippetConf(...params));
            listObject.conf.headerList = true;
            this.listHeaderText = false;
          } else {
            listObject = new Snippet(tempSnippetId, snippet.type, listContentsArray, new SnippetConf(...params));
          }
          modifiedSnippetsArray.push(listObject);
          listContentsArray = [];
        }
      } else {

        if (this.nextIsList && snippet.contents.endsWith(":")) {
          let listHeaderText = snippet.contents;
          listContentsArray.push(listHeaderText);
          this.listHeaderText = true;
        } else {
          let textObject = new Snippet(tempSnippetId, snippet.type, [snippet.contents], new SnippetConf(...params));
          modifiedSnippetsArray.push(textObject);
        }
      }
    });
    return modifiedSnippetsArray;
  }

  private generateSnippedIds(modifiedSnippets: Array<Snippet>): Array<Snippet> {
    modifiedSnippets.forEach((snippet, index) => {
      snippet.conf.position = index + 1;
      snippet.id = `${this.noteId}-${index + 1}`;
    });
    return modifiedSnippets;
  }

  private setListSnippetFlags(snippet: UnmodifiedSnippet, index: number): void {
    this.isList = (snippet.type === 'list') ? true : false;

    if (index === 0) {
      this.setFirstSnippetListFlags(index, this.snippets.length);
    } else if (index === this.snippets.length - 1) {
      this.setLastSnippetListFlags(index);
    } else {
      this.setBetweenFirstAndLastSnippetListFlags(index);
    }
  }

  private setFirstSnippetListFlags(index: number, arrayLength: number): void {
    if (arrayLength > 1) {
      let next = this.snippets[index + 1].type;
      this.prevIsList = false;
      this.nextIsList = (next === 'list') ? true : false;
    } else {
      this.prevIsList = false;
      this.nextIsList = false;
    }
  }

  private setLastSnippetListFlags(index: number): void {
    let prev = this.snippets[index - 1].type;
    this.prevIsList = (prev === 'list') ? true : false;
    this.nextIsList = false;
  }

  private setBetweenFirstAndLastSnippetListFlags(index: number): void {
    let prev = this.snippets[index - 1].type;
    let next = this.snippets[index + 1].type;
    this.prevIsList = (prev === 'list') ? true : false;
    this.nextIsList = (next === 'list') ? true : false;
  }

  convertTextToSnippets(inputText: string): Array<Snippet> {
    const inputChunks: Array<string> = this.inputToArray(inputText);
    const unmodifiedSnippets: Array<UnmodifiedSnippet> = this.generateSnippetObjectsArray(inputChunks);
    const modifiedSnippets: Array<Snippet> = this.modifySnippets(unmodifiedSnippets);
    const snippets: Array<Snippet> = this.generateSnippedIds(modifiedSnippets);
    return snippets;
  }

  private appendTextSnippet(snippet: Snippet): void {
    this.snippetString += `${snippet.contents[0]}\r\n`;
  }

  private appendListSnippet(snippet: Snippet): void {
    const list = snippet.contents;
    if (snippet.conf.headerList) this.stringifyHeaderListSnippet(list)
    else this.stringifyListSnippet(list);
  }

  private stringifyHeaderListSnippet(list: Array<string>): void {
    let listString = '';
    list.forEach((item, index) => {
      if (index === 0) listString += `${item}\r\n`;
      else listString += `* ${item}\r\n`;
    });
    this.snippetString += listString;
  }

  private stringifyListSnippet(list: Array<string>): void {
    let listString = '';
    list.forEach(item => listString += `* ${item}\r\n`);
    this.snippetString += listString;
  }

  convertSnippetsToText(snippets: Array<Snippet>): string {
    snippets.forEach(snippet => {
      if (snippet.type === 'text') this.appendTextSnippet(snippet);
      if (snippet.type === 'list') this.appendListSnippet(snippet);
    });
    return this.snippetString;
  }

  reset() {
    this.snippetString = '';
  }
}
