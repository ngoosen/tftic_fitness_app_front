import { Component } from '@angular/core';
import { AuthenticationService } from '../../tools/services/authentication.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLoggedIn: boolean = false;

  constructor(private _authService: AuthenticationService) { }

  ngOnInit() {
    const userId = this._authService.getUserId();

    if (userId) {
      this.isLoggedIn = userId !== "";
    }
  }
}
