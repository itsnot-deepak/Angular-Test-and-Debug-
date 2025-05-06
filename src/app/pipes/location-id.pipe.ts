import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationId'
})
export class LocationIdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
