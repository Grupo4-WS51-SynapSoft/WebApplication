import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { ServiceSearch } from '../model/service-search';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceSearchService extends BaseService<ServiceSearch> {
  constructor() {
    super();

    this.basePath = `${this.basePath}/services`;
  }

  override getAll(): Observable<ServiceSearch[]> {
    return this.http.get<ServiceSearch[]>(`${this.basePath}?_expand=caregiver`);
  }
}
