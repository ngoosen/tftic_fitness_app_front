import { Component, Input } from '@angular/core';
import { Exercise } from '../../../../models/exercise.model';

@Component({
  selector: 'app-exercise-list',
  standalone: false,
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss'
})
export class ExerciseListComponent {
  @Input() exercises: Exercise[] = [];
}
