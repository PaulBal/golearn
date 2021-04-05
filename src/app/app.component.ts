import { Component } from '@angular/core';
import { Lesson } from './lesson/lesson';
import { Tutor } from './tutor/tutor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'golearn';
  tutors: Tutor[] = [
    {
      firstName: "Melinda",
      lastName: "Popescu",
      expertise: ["Matematica"],
      hoursTutored: 20,
      review: 5
    },
    {
      firstName: "Ionut",
      lastName: "Popescu",
      expertise: ["Matematica", "Informatica"],
      hoursTutored: 20,
      review: 4
    },
    {
      firstName: "Alin",
      lastName: "Alinescu",
      expertise: ["limba romana", "limba engleza"],
      hoursTutored: 20,
      review: 3
    },
    {
      firstName: "Florin",
      lastName: "Petrescu",
      expertise: ["Geografie"],
      hoursTutored: 20,
      review: 4.5
    },
    {
      firstName: "Melinda",
      lastName: "Popescu",
      expertise: ["Biologie"],
      hoursTutored: 20,
      review: 5
    }
  ]

  print = (value) => {
    console.log(value);
  } 
}
