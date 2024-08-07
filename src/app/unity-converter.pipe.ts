import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unityConverter',
  standalone: true,
})
export class UnityConverterPipe implements PipeTransform {
  transform(value: number | string, conversion: string): number | null {
    if (typeof value === 'string') {
      value = Number(value);
    }

    if (typeof value === 'number') {
      if (!value) {
        return 0;
      }
      switch (conversion) {
        case 'HG-KG':
          return Math.round(value * 10) / 10;
        case 'DM-M':
          return Math.round(value * 10) / 10;
      }
    }
    return null;
  }
}
