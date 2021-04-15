import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from './tutor/tutor';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  // tutors: Observable<Tutor[]> = new new Observable<Tutor[]>();

  getTutors() {
    //fetch tutors from the server

    // return this.tutors;
  }
}
