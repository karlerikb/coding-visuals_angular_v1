import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NotesService } from './notes.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CoursesComponent } from './courses/courses.component';
import { NotesComponent } from './notes/notes.component';
import { SnippetsComponent } from './notes/snippets/snippets.component';
import { TextComponent } from './notes/snippets/text/text.component';
import { ListComponent } from './notes/snippets/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CoursesComponent,
    NotesComponent,
    SnippetsComponent,
    TextComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    NotesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
