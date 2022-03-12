import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length < 30) {
      if (value.length == 0) {
        return '---';
      }
      return value;
    } else {
      return value.slice(0, 30) + ' ...';
    }
  }
}
