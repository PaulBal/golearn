import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard.component';
import { LectureDashboardComponent } from '../lecture-dashboard/lecture-dashboard.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RoleGuardService } from '../_guards/role-guard.service';
import { EnrollmentDashboardComponent } from '../enrollment-dashboard/enrollment-dashboard.component';
import { TutorLectureDashboardComponent } from '../tutor-lecture-dashboard/tutor-lecture-dashboard.component';
import { MenuComponent } from '../menu/menu.component';
import { CallComponent } from '../call/call.component';

const routes: Routes = [
  {
    path: 'lectures',
    children: [
      {
        path: '',
        component: LectureDashboardComponent,
      },
      {
        path: '',
        component: MenuComponent,
        outlet: 'menu',
      },
    ],
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'student',
    },
  },
  {
    path: 'enrollments',
    children: [
      {
        path: '',
        component: EnrollmentDashboardComponent,
      },
      {
        path: '',
        component: MenuComponent,
        outlet: 'menu',
      },
    ],
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'student',
    },
  },
  {
    path: 'create-lecture',
    children: [
      {
        path: '',
        component: TeacherDashboardComponent,
      },
      {
        path: '',
        component: MenuComponent,
        outlet: 'menu',
      },
    ],
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'tutor',
    },
  },
  {
    path: 'my-lectures',
    children: [
      {
        path: '',
        component: TutorLectureDashboardComponent,
      },
      {
        path: '',
        component: MenuComponent,
        outlet: 'menu',
      },
    ],
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'tutor',
    },
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: '',
        component: MenuComponent,
        outlet: 'menu',
      },
    ],
  },
  {
    path: 'register',
    children: [
      {
        path: '',
        component: RegisterComponent,
      },
      {
        path: '',
        component: MenuComponent,
        outlet: 'menu',
      },
    ],
  },
  {
    path: 'room/:id',
    component: CallComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
