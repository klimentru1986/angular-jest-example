import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objToArr'
})
export class ObjToArrPipe implements PipeTransform {
  transform(value: Object): string[] {
    if (!value) {
      return [];
    }

    return Object.values(value);
  }
}
