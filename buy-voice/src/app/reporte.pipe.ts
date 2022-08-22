import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reporte'
})
export class ReportePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
