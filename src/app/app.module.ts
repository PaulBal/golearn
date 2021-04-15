import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TutorComponent } from './tutor/tutor.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LectureDashboardComponent } from './lecture-dashboard/lecture-dashboard.component';
import { LectureComponent } from './lecture/lecture.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TutorComponent,
    SearchBarComponent,
    TeacherDashboardComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    LectureDashboardComponent,
    LectureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
