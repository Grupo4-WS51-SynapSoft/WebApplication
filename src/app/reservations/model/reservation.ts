import { User } from '../../auth/model/User';
import { CaregiverServiceModel } from '../../search-caregivers/model/CaregiverService';

export interface Reservation {
  user: User;
  'search-caregiver': CaregiverServiceModel;
  date: string;
  startTime: string;
  endTime: string;
  totalFare: number;
  location: string;
}
