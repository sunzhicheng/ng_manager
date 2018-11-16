import { Injectable } from '@angular/core';
declare function $(filter: string): void;

@Injectable()
export class ToolAlert {
  static showLoad() {
    const load: any = $('.load');
    load.show();
  }

  static hideLoad() {
    const load: any = $('.load');
    load.hide();
  }

  static _success() {
    this.success('操作成功');
  }

  static error(tips: any) {
    const w: any = window;
    setTimeout(() => {
      w.sweetAlert('操作异常', tips, 'error');
    }, 200);
  }

  static success(content: any) {
    const w: any = window;
    if (!content) {
      content = '';
    }
    // swal({   title: '操作成功!',   text: ' ',   timer: 2000,   showConfirmButton: false });
    setTimeout(() => {
      w.swal('操作成功!', content, 'success');
    }, 200);
  }
  static warningTime(content: any) {
    const w: any = window;
    w.swal({
      title: '提示',
      text: content,
      showConfirmButton: false,
      timer: 2000
    });
  }

  static waring(content: any) {
    const w: any = window;
    if (!content) {
      content = '';
    }
    setTimeout(() => {
      w.swal({ title: content, text: '', type: 'warning' });
    }, 200);
  }

  static confirm(title: any, callback: any) {
    const w: any = window;
    w.swal({
      title: title,
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnConfirm: true,
      closeOnCancel: true
    }, (isConfirm: any) => {
      if (isConfirm) {
        callback.call();
      } else {
        w.swal('已经取消！', '', 'error');
      }
    });
  }

  static login(show: any = true) {
    if (show) {
      (<any>$('#tokenInvaildDiv')).modal('show');
    } else {
      (<any>$('#tokenInvaildDiv')).modal('hide');
    }
  }

}
