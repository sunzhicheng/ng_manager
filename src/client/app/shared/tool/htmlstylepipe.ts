import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'htmlstylepipe' })
export class Htmlstylepipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): any {
    const hm: any = this.sanitizer.bypassSecurityTrustHtml(value);
    return hm;
  }
}
