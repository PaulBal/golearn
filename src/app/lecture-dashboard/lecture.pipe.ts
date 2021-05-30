import { Pipe, PipeTransform } from '@angular/core';
import { Lecture } from '../_models/lecture';

@Pipe({
  name: 'lecture'
})
export class LecturePipe implements PipeTransform {

  transform(value: Lecture[], searchValue: string): Lecture[] {
    if (value.length === 0 || searchValue === '') {
      return value;
    }
    let lectures = [];
    for (const lecture of value) {
      if (lecture.title.includes(searchValue))
      lectures.push(lecture);
    }
    return lectures;
  }

}
