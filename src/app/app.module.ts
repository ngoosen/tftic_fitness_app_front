import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { Bike, Check, ChevronDown, ChevronUp, CirclePlay, CirclePlus, LucideAngularModule, Minus, Pencil, Search, Trash2, User } from 'lucide-angular';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddExerciseFormComponent } from './pages/admin/exercise/add-exercise-form/add-exercise-form.component';
import { ExerciseListComponent } from './pages/admin/exercise/exercise-list/exercise-list.component';
import { AddMeasureFormComponent } from './pages/admin/measures/add-measure-form/add-measure-form.component';
import { MeasuresListComponent } from './pages/admin/measures/measures-list/measures-list.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { TrainingSessionComponent } from './pages/training-session/training-session.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LineChartComponent } from './shared/components/ui/line-chart/line-chart.component';
import { PopupComponent } from './shared/components/ui/popup/popup.component';
import { TrainingSessionsComponent } from './pages/training-sessions/training-sessions.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    AddExerciseFormComponent,
    ExerciseListComponent,
    PopupComponent,
    AddMeasureFormComponent,
    MeasuresListComponent,
    ExerciseComponent,
    ExercisesComponent,
    TrainingSessionComponent,
    LineChartComponent,
    TrainingSessionsComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BaseChartDirective,
    LucideAngularModule.pick({
      Trash2,
      Pencil,
      ChevronDown,
      ChevronUp,
      Check,
      Minus,
      CirclePlus,
      Bike,
      User,
      Search,
      CirclePlay
    }),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
