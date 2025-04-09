import { Component } from '@angular/core';
import { AuthenticationService } from '../../../tools/services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  displayLoggedInUser: boolean = false;
  displayDropDownMenu: boolean = false;
  userIsAdmin: boolean = false;

  constructor(private _authService: AuthenticationService) { }

  ngOnInit() {
    this.userIsAdmin = this._authService.isAdmin;
    this.displayLoggedInUser = this._authService.isAdmin;

    if (!this.userIsAdmin) {
      const isAdmin = localStorage.getItem("isAdmin");

      if (isAdmin) {
        this.userIsAdmin = isAdmin === "true";
        this.displayLoggedInUser = isAdmin === "true";
      }
    }
  }

  toggleMenu() {
    this.displayDropDownMenu = !this.displayDropDownMenu;
  }
}
