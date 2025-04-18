import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './authentication.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TrainingSessionComponent } from './pages/training-session/training-session.component';
import { TrainingSessionsComponent } from './pages/training-sessions/training-sessions.component';

const routes: Routes = [
  { path: "", component: HomeComponent, },
  { path: "admin", component: AdminComponent, canActivate: [authenticationGuard] },
  { path: "exercise", component: ExercisesComponent, },
  { path: "exercise/:id", component: ExerciseComponent, },
  { path: "training-session", component: TrainingSessionsComponent, },
  { path: "training-session/:id", component: TrainingSessionComponent, },
  { path: "login", component: LoginComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
