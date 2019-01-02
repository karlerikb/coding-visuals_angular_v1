import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { SnippetsService } from './snippet/snippets/snippets.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CoursesComponent } from './courses/courses.component';
import { NotesComponent } from './notes/notes.component';
import { SnippetsComponent } from './snippet/snippets/snippets.component';
import { TextComponent } from './snippet/snippets/text/text.component';
import { ListComponent } from './snippet/snippets/list/list.component';
import { SnippetsListComponent } from './snippet/snippets-list/snippets-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CoursesComponent,
    NotesComponent,
    SnippetsComponent,
    TextComponent,
    ListComponent,
    SnippetsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    SnippetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
