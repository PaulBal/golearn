import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard.component';
import { LectureDashboardComponent } from '../lecture-dashboard/lecture-dashboard.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RoleGuardService } from '../_guards/role-guard.service';
import { EnrollmentsComponent } from '../enrollments/enrollments.component';
import { MyLecturesComponent } from '../my-lectures/my-lectures.component';

const routes: Routes = [
  { 
    path: 'lectures', 
    component: LectureDashboardComponent, 
    canActivate: [RoleGuardService], 
    data: { 
      expectedRole: 'student' 
    } 
  },
  { 
    path: 'login', 
    component: LoginComponent
   },
  { 
    path: 'register', 
    component: RegisterComponent
  },
  { path: 'profile', component: ProfileComponent },
  { 
    path: 'create-lecture', 
    component: TeacherDashboardComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'tutor'
    }
  },
  {
    path: 'enrollments',
    component: EnrollmentsComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'student'
    }
  },
  {
    path: 'my-lectures',
    component: MyLecturesComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'tutor'
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }