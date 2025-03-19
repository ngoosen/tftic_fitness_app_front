import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { ChevronDown, ChevronUp, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddExerciseFormComponent } from './pages/admin/exercise/add-exercise-form/add-exercise-form.component';
import { ExerciseListComponent } from './pages/admin/exercise/exercise-list/exercise-list.component';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    AddExerciseFormComponent,
    ExerciseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LucideAngularModule.pick({
      Trash2,
      Pencil,
      ChevronDown,
      ChevronUp,
    }),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
