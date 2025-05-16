import { Injectable, signal } from '@angular/core';
import { Notes } from '../components/models/notes.models';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  note = signal<Notes[]>([]);

  addToNote(note: Notes) {
    this.note.set([...this.note(), note]);
  }
  constructor() {}
}
