import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteResolverService } from './notes/note-resolver.service';

import { CoursesComponent } from './courses/courses.component';
import { NotesComponent } from './notes/notes.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NoteDisplayPlaceholderComponent } from './notes/note-display/note-display-placeholder/note-display-placeholder.component';
import { NoteDisplayComponent } from './notes/note-display/note-display.component';
import { NotePageComponent } from './notes/note-page/note-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { 
    path: 'note', children: [
      { path: '', redirectTo: '/notes/list', pathMatch: 'full' },
      { path: ':id', component: NotePageComponent, resolve: { note: NoteResolverService } }
    ] 
  },
  { path: 'courses', component: CoursesComponent },
  { 
    path: 'notes', component: NotesComponent, children: [
      { path: '', redirectTo: '/notes/list', pathMatch: 'full' },
      { path: 'new', component: NoteEditComponent },
      { 
        path: 'list', component: NotesListComponent, children: [
          { path: '', component: NoteDisplayPlaceholderComponent, pathMatch: 'full' },
          { path: ':id', component: NoteDisplayComponent }
        ] 
      }
    ] 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}