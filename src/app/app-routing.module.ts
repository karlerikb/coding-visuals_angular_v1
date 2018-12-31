import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { NotesComponent } from './notes/notes.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent },
  { path: 'notes', component: NotesComponent },
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