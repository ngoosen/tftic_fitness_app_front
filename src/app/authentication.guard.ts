import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './tools/services/authentication.service';
import { TrainingSessionService } from './tools/services/training-session.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const trainingService = inject(TrainingSessionService);
  const router = inject(Router);

  let userId = authService.getUserId();
  let isAdmin = authService.isAdmin;

  if (!userId) {
    const localValue = localStorage.getItem("userId");

    if (localValue) {
      userId = localValue;
      authService.setUserId(userId, false);
    }
  }

  if (!isAdmin) {
    const localValue = localStorage.getItem("isAdmin");

    if (localValue) {
      authService.setUserId(userId ?? "", localValue === "true");
      isAdmin = localValue === "true";
    }
  }

  if (route.routeConfig?.path === "admin" && !authService.isAdmin) {
    router.navigate(["/login"]);
    return false;
  }

  return true;
};
