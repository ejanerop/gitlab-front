import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'level',
})
export class LevelPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value == 5) {
      return 'Minimal access';
    } else if (value == 10) {
      return 'Guest';
    } else if (value == 20) {
      return 'Reporter';
    } else if (value == 30) {
      return 'Developer';
    } else if (value == 40) {
      return 'Maintainer';
    } else if (value == 50) {
      return 'Owner';
    } else {
      return 'No access';
    }
  }
}
