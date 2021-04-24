import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard.component';
import { LectureDashboardComponent } from '../lecture-dashboard/lecture-dashboard.component';

const routes: Routes = [
  { path: 'lectures', component: LectureDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'teacher', component: TeacherDashboardComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }