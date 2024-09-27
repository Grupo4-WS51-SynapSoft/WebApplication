import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../model/User';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<User> {
  constructor() {
    super();
    this.basePath = `${this.basePath}/users`;
  }

  login(email: string, password: string) {
    console.log(email, password);
    return this.http
      .get<User>(this.basePath, {
        params: { email, password },
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  signUp(user: Omit<User, 'id'>) {
    return this.http
      .post<User>(this.basePath, user)
      .pipe(retry(2), catchError(this.handleError));
  }
}
