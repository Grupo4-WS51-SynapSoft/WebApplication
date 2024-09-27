export interface CaregiverServiceModel {
  id: number;
  fullName: string;
  image: string;
  address: string;
  description: string;
  rate: number;
  serviceDescription: CaregiverServiceDescription;
}

export interface CaregiverServiceDescription {
  biography: string;
  schedule: string[];
  workHours: {
    startTime: string;
    endTime: string;
  };
  farePerHour: number;
  workaround: string[];
}
