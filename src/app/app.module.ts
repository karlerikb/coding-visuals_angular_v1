import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './site/home/home.component';
import { CoursesComponent } from './site/courses/courses.component';
import { NotesComponent } from './site/notes/notes.component';
import { MainNavComponent } from './site/main-nav/main-nav.component';
import { PageEditmodeComponent } from './page-editmode/page-editmode.component';
import { PageNormalComponent } from './page-normal/page-normal.component';
import { PageListpreviewComponent } from './page-listpreview/page-listpreview.component';
import { EditNoteComponent } from './page-editmode/edit-note/edit-note.component';
import { EditNotePlaceholderComponent } from './page-editmode/edit-note-placeholder/edit-note-placeholder.component';
import { NewNoteFormComponent } from './page-editmode/edit-note/new-note-form/new-note-form.component';
import { EditNotePreviewComponent } from './page-editmode/edit-note/edit-note-preview/edit-note-preview.component';
import { NotelistEditmodeComponent } from './page-editmode/notelist-editmode/notelist-editmode.component';
import { EditNotePreviewPlaceholderComponent } from './page-editmode/edit-note/edit-note-preview/edit-note-preview-placeholder/edit-note-preview-placeholder.component';
import { NoteEditmodeComponent } from './page-editmode/notelist-editmode/note-editmode/note-editmode.component';
import { NotelistEditmodePlaceholderComponent } from './page-editmode/notelist-editmode/notelist-editmode-placeholder/notelist-editmode-placeholder.component';
import { SnippetEditmodeComponent } from './page-editmode/snippet-editmode/snippet-editmode.component';
import { TextsnippetEditmodeComponent } from './page-editmode/snippet-editmode/textsnippet-editmode/textsnippet-editmode.component';
import { ListsnippetEditmodeComponent } from './page-editmode/snippet-editmode/listsnippet-editmode/listsnippet-editmode.component';
import { SnippetNotelistComponent } from './page-editmode/snippet-notelist/snippet-notelist.component';
import { EditNoteFormComponent } from './page-editmode/edit-note/edit-note-form/edit-note-form.component';

import { PagesService } from './services/page/pages.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    NotesComponent,
    MainNavComponent,
    PageEditmodeComponent,
    PageNormalComponent,
    PageListpreviewComponent,
    EditNoteComponent,
    EditNotePlaceholderComponent,
    NewNoteFormComponent,
    EditNotePreviewComponent,
    NotelistEditmodeComponent,
    EditNotePreviewPlaceholderComponent,
    NoteEditmodeComponent,
    NotelistEditmodePlaceholderComponent,
    SnippetEditmodeComponent,
    TextsnippetEditmodeComponent,
    ListsnippetEditmodeComponent,
    SnippetNotelistComponent,
    EditNoteFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    PagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
