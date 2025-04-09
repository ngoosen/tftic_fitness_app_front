import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './tools/services/authentication.service';
import { TrainingSessionService } from './tools/services/training-session.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const trainingService = inject(TrainingSessionService);
  const router = inject(Router);

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin");

  if (userId) {
    authService.userId = userId;
    trainingService.setUserId(userId);
  }

  if (isAdmin) {
    authService.isAdmin = isAdmin === "true";
  }

  if (route.routeConfig?.path === "admin" && !authService.isAdmin) {
    router.navigate(["/login"]);
    return false;
  }

  return true;
};
