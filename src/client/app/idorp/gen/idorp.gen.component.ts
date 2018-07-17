import { Component, OnInit } from '@angular/core';

import { IdRestyExamplesComponent } from './idexample/idrestyexamples.component';


@Component({
    moduleId: module.id,
    selector: 'sd-idorpgen',
    templateUrl: 'idorp.gen.component.html'
})

/**
 *  自动生成组件演示
 */
export class IdorpGenComponent implements OnInit {

    items = [
        {
          'title': 'IdRestyExamples',
          'icon': 'angular',
          'description': 'IdExample',
          'color': '#E63135',
          comp: IdRestyExamplesComponent
        }
    ];

    // tslint:disable-next-line:no-empty
    constructor() { }

    // tslint:disable-next-line:no-empty
    ngOnInit(): void { }

    openNavDetailsPage(item: any) {
        // this.nav.push(item.comp, { item: item });
    }
}
