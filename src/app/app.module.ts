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
import { EditNoteFormComponent } from './page-editmode/edit-note/edit-note-form/edit-note-form.component';
import { EditNotePreviewComponent } from './page-editmode/edit-note/edit-note-preview/edit-note-preview.component';
import { NotelistEditmodeComponent } from './page-editmode/notelist-editmode/notelist-editmode.component';
import { EditNotePreviewPlaceholderComponent } from './page-editmode/edit-note/edit-note-preview/edit-note-preview-placeholder/edit-note-preview-placeholder.component';
import { NoteEditmodeComponent } from './page-editmode/notelist-editmode/note-editmode/note-editmode.component';


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
    EditNoteFormComponent,
    EditNotePreviewComponent,
    NotelistEditmodeComponent,
    EditNotePreviewPlaceholderComponent,
    NoteEditmodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
