import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  constructor() {
    super();
  }

  getTutors() {
    return this.http.get<User[]>(`${this.basePath}/tutors`);
  }

  getCaregivers() {
    return this.http.get<User[]>(`${this.basePath}/caregivers`);
  }
}
