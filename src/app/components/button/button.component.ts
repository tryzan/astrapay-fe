import { Component, input, output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  type = input('');
  btnClicked = output();

  getIconClass(): string {
    switch (this.type()) {
      case 'delete':
        return 'bi bi-x-lg';
      case 'create':
        return 'bi bi-plus-lg';
      case 'detail':
        return 'bi bi-info-circle';
      default:
        return 'bi bi-question';
    }
  }

  handleButtonClick() {
    this.btnClicked.emit();
  }
}
