import { Routes } from '@angular/router';
import path from 'node:path';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { AddNoteComponent } from './pages/add-note/add-note.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: NotesListComponent },
  {
    path: 'add',
    component: AddNoteComponent,
  },
];
