import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { CaregiverServiceModel } from '../model/CaregiverService';

@Injectable({
  providedIn: 'root',
})
export class CaregiverService extends BaseService<CaregiverServiceModel> {
  constructor() {
    super();
    this.basePath = `${this.basePath}/search-caregivers`;
  }
}
