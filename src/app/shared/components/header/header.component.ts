import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.userIsAdmin = this._authService.isAdmin;
    const userId = this._authService.getUserId();

    if (userId && userId !== "") {
      this.displayLoggedInUser = true;
    }

    if (!this.userIsAdmin) {
      const isAdmin = localStorage.getItem("isAdmin");

      if (isAdmin) {
        this.userIsAdmin = isAdmin === "true";
      }
    }
  }

  toggleMenu() {
    this.displayDropDownMenu = !this.displayDropDownMenu;
  }

  logoutUser() {
    this._authService.logout();
    this.displayDropDownMenu = false;
    this._router.navigate(["/"]);
    window.location.reload();
  }
}
