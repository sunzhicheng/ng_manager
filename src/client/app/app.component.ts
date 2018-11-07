import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
declare const $: any;
/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  constructor(private title: Title) {
    $('sd-app').addClass('vbox');
    console.log('AppComponent... ');
    // const ptType = localStorage.getItem('ptType');
    // if (ptType === 'operate') {
    //   this.title.setTitle(platform_name + platform_operate_name);
    // } else {
    //   this.title.setTitle(platform_name + platform_business_name);
    // }
  }
}
