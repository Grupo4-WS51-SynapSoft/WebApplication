import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CaregiverService } from '../../services/caregiver.service';
import { CaregiverServiceModel } from '../../model/CaregiverService';

@Component({
  selector: 'app-caregiver-detail',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './caregiver-detail.component.html',
  styleUrl: './caregiver-detail.component.css',
})
export class CaregiverDetailComponent implements OnInit {
  private userId?: number;

  public caregiver?: CaregiverServiceModel;

  constructor(
    private caregiverService: CaregiverService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  ngOnInit() {
    if (!this.userId) return;
    this.caregiverService.getById(this.userId).subscribe((caregiver) => {
      this.caregiver = caregiver;
    });
  }
}
