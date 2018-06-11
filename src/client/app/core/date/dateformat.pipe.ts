import { Pipe, PipeTransform } from '@angular/core';
import { ToolHttpService } from '../../shared/tool';


/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
@Pipe({name: 'dateformat'})
export class DateFormatPipe implements PipeTransform {

  constructor(private toolHttp: ToolHttpService) {
  }

  transform(value: any, exponent: string): any {
    if (isNaN(value)) {
      //全是数据   long ----dateString
      const v: number = (Number)(value);
      return this.toolHttp.long2Date(v);
    } else {
      // date -----long
      return value.getTime();
    }
  }
}
