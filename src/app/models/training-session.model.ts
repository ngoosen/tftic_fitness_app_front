import { User } from "./user.model";

export interface TrainingSession {
  id: string;
  training_date: Date;
  duration: string;
  description: string;
  user: User;
}

export interface FullTrainingSessionData {
  id: string;
  training_date: Date;
  duration: string;
  description: string;
  user: User;
  exercises: {
    id: string;

    exercise: {
      id: string;
      exercise_name: string;
      image: string;
      description: string;
    };

    series: {
      id: string;
      reps: number;
      measures: {
        id: string;
        measure_quantity: number;
        measure: {
          id: string;
          measure_name: string;
          unit: string;
        }
      }[]
    }[]
  }[]
}
