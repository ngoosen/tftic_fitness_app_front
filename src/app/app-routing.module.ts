import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';

const routes: Routes = [
  { path: "admin", component: AdminComponent, },
  { path: "exercise/:id", component: ExerciseComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
