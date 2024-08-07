import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statPercent',
  standalone: true,
})
export class StatPercentPipe implements PipeTransform {
  transform(value: string | number): number | null {
    if (typeof value === 'string') {
      value = Number(value);
    }

    return (value / 255) * 100;
  }
}
