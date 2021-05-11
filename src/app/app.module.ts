import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_modules/material.module';
import { TutorComponent } from './tutor/tutor.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './_modules/app-routing.module';
import { LectureDashboardComponent } from './lecture-dashboard/lecture-dashboard.component';
import { LectureComponent } from './lecture/lecture.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EnrollmentDashboardComponent } from './enrollment-dashboard/enrollment-dashboard.component';
import { MyLecturesComponent } from './my-lectures/my-lectures.component';
import { MenuComponent } from './menu/menu.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';

@NgModule({
  declarations: [
    AppComponent,
    TutorComponent,
    SearchBarComponent,
    TeacherDashboardComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    LectureDashboardComponent,
    LectureComponent,
    PageNotFoundComponent,
    EnrollmentDashboardComponent,
    MyLecturesComponent,
    MenuComponent,
    EnrollmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
