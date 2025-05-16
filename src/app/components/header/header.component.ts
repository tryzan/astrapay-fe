import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  handleCreateNotes() {
    this.router.navigate(['/add']);
  }
}
