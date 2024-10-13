// import { CaregiverServiceModel } from '../../search-caregivers/model/CaregiverService';

import { User } from '../../auth/model/user';

export interface Reservation {
  id?: number;
  tutorId: number;
  caregiverId: number;
  serviceId: number;
  status: string;
  createdAt: string;
  schedule: {
    date: string;
    startTime: string;
    endTime: string;
  };
  tutor?: User;
  caregiver?: User;
  totalFare: number;
}
