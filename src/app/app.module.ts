import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { SnippetsService } from './snippet/snippets/snippets.service';
import { NotesService } from './notes/notes.service';
import { NotePreviewService } from './notes/note-edit/note-preview.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CoursesComponent } from './courses/courses.component';
import { NotesComponent } from './notes/notes.component';
import { SnippetsComponent } from './snippet/snippets/snippets.component';
import { TextComponent } from './snippet/snippets/text/text.component';
import { ListComponent } from './snippet/snippets/list/list.component';
import { SnippetsListComponent } from './snippet/snippets-list/snippets-list.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NotesListItemComponent } from './notes/notes-list/notes-list-item/notes-list-item.component';
import { NoteDisplayComponent } from './notes/note-display/note-display.component';
import { NoteDisplayPlaceholderComponent } from './notes/note-display/note-display-placeholder/note-display-placeholder.component';
import { NoteResolverService } from './notes/note-resolver.service';
import { NotePageComponent } from './notes/note-page/note-page.component';
import { PagesComponent } from './pages/pages.component';
import { PageEditComponent } from './pages/page-edit/page-edit.component';
import { PagesListComponent } from './pages/pages-list/pages-list.component';
import { PageDisplayComponent } from './pages/page-display/page-display.component';
import { NoteEditFormComponent } from './notes/note-edit/note-edit-form/note-edit-form.component';
import { PageEditNotelistPreviewComponent } from './pages/page-edit/page-edit-notelist-preview/page-edit-notelist-preview.component';
import { PagePreviewService } from './pages/page-edit/page-preview.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CoursesComponent,
    NotesComponent,
    SnippetsComponent,
    TextComponent,
    ListComponent,
    SnippetsListComponent,
    NoteEditComponent,
    NotesListComponent,
    NotesListItemComponent,
    NoteDisplayComponent,
    NoteDisplayPlaceholderComponent,
    NotePageComponent,
    PagesComponent,
    PageEditComponent,
    PagesListComponent,
    PageDisplayComponent,
    NoteEditFormComponent,
    PageEditNotelistPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    SnippetsService,
    NotesService,
    NotePreviewService,
    NoteResolverService,
    PagePreviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
