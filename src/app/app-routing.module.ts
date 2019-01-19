import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './site/home/home.component';
import { CoursesComponent } from './site/courses/courses.component';
import { NotesComponent } from './site/notes/notes.component';
import { PageEditmodeComponent } from './page-editmode/page-editmode.component';
import { PageListpreviewComponent } from './page-listpreview/page-listpreview.component';
import { PageNormalComponent } from './page-normal/page-normal.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'course', component: CoursesComponent },
  {
    path: 'note', component: NotesComponent, children: [
      { path: '', redirectTo: '/note/list', pathMatch: 'full' },
      {
        path: 'edit', children: [
          { path: '', component: PageEditmodeComponent, pathMatch: 'full' },
          // { path: ':id', component: PageEditmodeComponent }
        ]
      },
      { path: 'list', component: PageListpreviewComponent },
      { path: ':id', component: PageNormalComponent }
    ] 
  }
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