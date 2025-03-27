import { User } from "./user.model";

export interface TrainingSession {
  id: string;
  training_date: Date;
  duration: string;
  description: string;
  user: User;
}
