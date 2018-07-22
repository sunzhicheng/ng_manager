import { Component, OnInit } from '@angular/core';

import { IdRestyExamplesComponent } from './idrestyexamples/idrestyexamples.component';


@Component({
    moduleId: module.id,
    selector: 'sd-idexamplegen',
    templateUrl: 'idexample.gen.component.html'
})

/**
 *  自动生成组件演示I
 */
export class IdexampleGenComponent implements OnInit {

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
