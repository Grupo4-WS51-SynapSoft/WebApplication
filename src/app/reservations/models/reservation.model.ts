export class Reservation {
  caregiverName: string;
  location: string;
  reservationDate: Date;
  timeWork: string;
  fare: number;
  status: string;

  constructor(
    caregiverName: string,
    location: string,
    reservationDate: Date,
    timeWork: string,
    fare: number,
    status: string
  ) {
    this.caregiverName = caregiverName;
    this.location = location;
    this.reservationDate = reservationDate;
    this.timeWork = timeWork;
    this.fare = fare;
    this.status = status;
  }
}
