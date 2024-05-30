import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})

export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / (1000 * 60 * 60));
    const minutes = Math.floor((value % (1000 * 60  * 60)) / (1000 * 60));
    const seconds = Math.floor((value % (1000 * 60)) / 1000);

    if (hours === 0) {
      return `${minutes}min ${seconds}s`;
    } else {
      return `${hours}h ${minutes}min`;
    }
  }
}
