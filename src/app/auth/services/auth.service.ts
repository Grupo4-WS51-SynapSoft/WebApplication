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
  }

  login(email: string, password: string) {
    console.log(email, password);
    return this.http
      .get(`${this.basePath}/users`, {
        params: { email, password },
      })
      .pipe(retry(2), catchError(this.handleError));
  }
}
