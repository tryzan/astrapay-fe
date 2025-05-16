import { Component, signal } from '@angular/core';
import { Notes } from '../../components/models/notes.models';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../../components/button/button.component';
import { ApiResponse } from '../../components/models/api-response.models';

@Component({
  selector: 'app-notes-list',
  imports: [ButtonComponent],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
})
export class NotesListComponent {
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.http
      .get<
        ApiResponse<{
          data: Notes[];
          totalElements: number;
          totalPages: number;
          size: number;
        }>
      >('http://localhost:8000/notes')
      .subscribe({
        next: (res) => {
          if (res.success === true) {
            this.notes.set(res.data.data);
          } else {
            throw new Error('Failed to Fetch Data, Check the logs');
          }
        },
        error: (err) => {
          console.error('Error fetching notes:', err);
        },
      });
  }

  notes = signal<Notes[]>([]);

  handleDetailClick(noteId: number) {}
  handleDeleteNotes(noteId: number) {
    this.http
      .delete<ApiResponse<[]>>('http://localhost:8000/notes' + '/' + noteId)
      .subscribe({
        next: (res) => {
          console.log('delete : ', res);
          if (res.success == true) {
            this.fetchNotes();
          } else {
            throw new Error('Failed to Delete Data, Check the logs');
          }
        },
        error: (err) => {
          console.error('Error delete note', err);
        },
      });
  }
}
