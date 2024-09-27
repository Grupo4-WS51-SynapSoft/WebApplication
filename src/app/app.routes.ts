import { Routes } from '@angular/router';

import { LoginComponent } from './auth/pages/login/login.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { HomeComponent } from './home/home/home.component';
import { SearchPageComponent } from './search-caregivers/pages/search-page/search-page.component';
import { CaregiverDetailComponent } from './search-caregivers/pages/caregiver-detail/caregiver-detail.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'search-caregiver', component: SearchPageComponent },
      { path: 'search-caregiver/:id', component: CaregiverDetailComponent },
    ],
  },
];
