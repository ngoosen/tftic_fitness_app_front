import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../tools/services/authentication.service';
import { TrainingSessionService } from '../../tools/services/training-session.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  displayLogIn: boolean = false;

  enteredUsername: string = "";
  enteredEmail: string = "";
  enteredPassword: string = "";

  errors: string[] = [];

  constructor (
    private _router: Router,
    private _authService: AuthenticationService,
    private _trainingService: TrainingSessionService,
  ) { }

  ngOnInit() {
    const userId = this._authService.getUserId();

    if (userId && userId !== "") {
      this._router.navigate(["/"]);
    }
  }

  login() {
    if (this.enteredEmail === "" || this.enteredPassword === "") {
      if (this.enteredEmail === "" && !this.errors.includes("Veuillez entrer votre email.")) {
        this.errors.push("Veuillez entrer votre email.");
      }

      if (this.enteredPassword === "" && !this.errors.includes("Veuillez entrer votre mot de passe.")) {
        this.errors.push("Veuillez entrer votre mot de passe.");
      }

      return;
    }

    this._authService.login(this.enteredEmail, this.enteredPassword).subscribe({
      next: (result) => {
        this._authService.setUserId(result.id, result.isAdmin);
        this._trainingService.setUserId(result.id);
        this._router.navigate(["/"]);
        window.location.reload();
      },
      error: (e) => {
        this.errors.push(e.error.message);
      },
    });
  }

  register() {
    if (this.enteredEmail === "" || this.enteredPassword === "" || this.enteredUsername === "") {
      if (this.enteredUsername === "" && !this.errors.includes("Veuillez entrer un nom d'utilisateur.")) {
        this.errors.push("Veuillez entrer un nom d'utilisateur.");
      }

      if (this.enteredEmail === "" && !this.errors.includes("Veuillez entrer un email valide.")) {
        this.errors.push("Veuillez entrer un email valide.");
      }

      if (this.enteredPassword === "" && !this.errors.includes("Veuillez entrer un mot de passe.")) {
        this.errors.push("Veuillez entrer un mot de passe.");
      }

      return;
    }

    this._authService.register(this.enteredUsername, this.enteredEmail, this.enteredPassword).subscribe({
      next: (result) => {
        this._authService.setUserId(result.id, result.isAdmin);
        this._trainingService.setUserId(result.id);
        this._router.navigate(["/"]);
        window.location.reload();
      },
      error: (e) => {
        this.errors.push(e.error.message);
      }
    });
  }

  clearErrors() {
    this.errors = [];
  }

  toggleLogIn() {
    this.enteredEmail = "";
    this.enteredPassword = "";
    this.enteredUsername = "";
    this.errors = [];
    this.displayLogIn = !this.displayLogIn;
  }
}
