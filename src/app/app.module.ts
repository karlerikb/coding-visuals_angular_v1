import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CoursesComponent } from './courses/courses.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CoursesComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
