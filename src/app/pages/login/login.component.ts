import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  displayLogIn: boolean = false;

  toggleLogIn() {
    this.displayLogIn = !this.displayLogIn;
  }
}
