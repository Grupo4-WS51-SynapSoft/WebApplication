import { User } from '../../shared/models/user';

export interface ServiceSearch {
  id: number;
  caregiverId: number;
  description: string;
  schedules: Schedule[];
  workaround: string[];
  farePerHour: number;
  caregiver: User;
  rating: number;
}

interface Schedule {
  day: string;
  workHours: {
    startTime: string;
    endTime: string;
  };
}
