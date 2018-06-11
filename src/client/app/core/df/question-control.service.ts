import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  // constructor() { }

  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  // 根据表单配置参数创建表单规则
  toIFormGroup(iForm: any) {
    const group: any = {};

    if (iForm.row_list) {
      iForm.row_list.forEach((row: any ) => {
        row.item_list.forEach((item: any) => {
          group[item.key] = item.required ? new FormControl(item.hints || '', Validators.required)
            : new FormControl(item.hints || '');
        });
      });
    }
    return new FormGroup(group);
  }

}
