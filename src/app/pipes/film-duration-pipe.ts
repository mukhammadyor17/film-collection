import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filmDuration',
})
export class FilmDurationPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    const h = Math.floor(value / 60);
    const m = value % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }
}
