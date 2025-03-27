import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingSessionService } from '../../tools/services/training-session.service';

@Component({
  selector: 'app-training-session',
  standalone: false,
  templateUrl: './training-session.component.html',
  styleUrl: './training-session.component.scss'
})
export class TrainingSessionComponent {
  trainingSessionId: string | undefined;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _trainingSessionService: TrainingSessionService
  ) {
    const paramId = _activatedRoute.snapshot.params["id"];

    if (paramId) {
      this.trainingSessionId = paramId;
    } else {
      const serviceId = _trainingSessionService.currentTrainingSessionId;

      if (serviceId) {
        _router.navigate(["/training-session", serviceId]);
      }
    }
  }

  startTrainingSession() {
    this._trainingSessionService.startTrainingSession().subscribe({
      next: (result) => {
        this._trainingSessionService.setSessionId(result.id);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
