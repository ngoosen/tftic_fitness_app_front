import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Output() onClose: EventEmitter<boolean>;

  constructor() {
    this.onClose = new EventEmitter<boolean>;
  }

  closeHandler() {
    this.onClose.emit();
  }
}
