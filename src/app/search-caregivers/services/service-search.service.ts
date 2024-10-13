import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { ServiceSearch } from '../model/service-search';
import { catchError, map, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceSearchService extends BaseService<ServiceSearch> {
  constructor() {
    super();

    this.basePath = `${this.basePath}/services`;
  }

  override getAll() {
    return this.http
      .get<ServiceSearch[]>(`${this.basePath}?_expand=caregiver`)
      .pipe(retry(2), catchError(this.handleError));
  }

  override getById(id: number) {
    return this.http
      .get<ServiceSearch>(`${this.basePath}/${id}?_expand=caregiver`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
