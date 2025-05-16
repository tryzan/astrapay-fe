import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../components/models/api-response.models';
@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css',
})
export class AddNoteComponent {
  noteForm: FormGroup;

  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.noteForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  onSubmit() {
    const noteData = this.noteForm.value;
    this.http
      .post<ApiResponse<{ description: string; title: string }>>(
        'http://localhost:8000/notes',
        noteData
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.success == true) {
            this.router.navigate(['/']);
          } else {
            const messages = [];

            if (res.data.description) {
              messages.push('description ' + res.data.description);
            }
            if (res.data.title) {
              messages.push('title ' + res.data.title);
            }

            this.errorMessage = messages.join(',');
          }
        },
        error: (err) => {
          this.errorMessage = 'Failed to add note. Please try again.';
          console.error('Error adding note', err);
        },
      });
  }
}
