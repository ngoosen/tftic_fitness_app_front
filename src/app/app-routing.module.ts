import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { TrainingSessionComponent } from './pages/training-session/training-session.component';
import { TrainingSessionsComponent } from './pages/training-sessions/training-sessions.component';

const routes: Routes = [
  { path: "admin", component: AdminComponent, },
  { path: "exercise", component: ExercisesComponent, },
  { path: "exercise/:id", component: ExerciseComponent, },
  { path: "training-session", component: TrainingSessionsComponent, },
  { path: "training-session/:id", component: TrainingSessionComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
