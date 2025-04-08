import { Component } from '@angular/core';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import { FullTrainingSessionData } from '../../models/training-session.model';
import { TrainingSessionService } from '../../tools/services/training-session.service';

@Component({
  selector: 'app-training-sessions',
  standalone: false,
  templateUrl: './training-sessions.component.html',
  styleUrl: './training-sessions.component.scss'
})
export class TrainingSessionsComponent {
  trainingSessions: FullTrainingSessionData[] = [];

  displayDeletePopup: boolean = false;
  trainingSessionToDeleteId: string = "";

  constructor(
    private _router: Router,
    private _trainingSessionService: TrainingSessionService,
  ) { }

  ngOnInit() {
    const serviceId = this._trainingSessionService.getSessionId();

    if (serviceId) {
      this._router.navigate(["/training-session", serviceId]);
    } else {
      this.getTrainingSessions();
    }
  }

  getTrainingSessions() {
    this._trainingSessionService.getAllTrainingSessions().subscribe({
      next: (result) => {
        this.trainingSessions = result.sort((res1, res2) => {
          const date1 = dayjs(res1.training_date);
          const date2 = dayjs(res2.training_date);

          if (date1.isBefore(date2)) {
            return 1;
          }

          if (date1.isAfter(date2)) {
            return -1;
          }

          return 0;
        });
      }
    });
  }

  startTrainingSession() {
    this._trainingSessionService.startTrainingSession().subscribe({
      next: (result) => {
        this._trainingSessionService.setSessionId(result.id);
        this._router.navigate(["/training-session", result.id]);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  removeTrainingSession(id: string) {
    this.displayDeletePopup = true;
    this.trainingSessionToDeleteId = id;
  }

  confirmRemoveTrainingSession() {
    this._trainingSessionService.deleteTrainingSession(this.trainingSessionToDeleteId).subscribe({
      next: (result) => {
        this.getTrainingSessions();
        this.displayDeletePopup = false;
        this.trainingSessionToDeleteId = "";
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
