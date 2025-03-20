import { Measure } from "./measure.model";

export interface Exercise {
  id: string;
  exercise_name: string;
  image: string;
  description: string;
  trackable_measures: Measure[];
}

export interface CreateExerciseDTO {
  exercise_name: string;
  trackable_measures: string[];
  image?: string;
  description?: string;
}

export interface UpdateExerciseDTO {
  id: string;
  exercise_name: string;
  trackable_measures: string[];
  image?: string;
  description?: string;
}
