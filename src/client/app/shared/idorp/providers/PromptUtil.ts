import { Injectable } from '@angular/core';
declare function $(filter: string): void;

@Injectable()
export class PromptUtil {
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

  static _error(msg: any) {
    this.error(msg);
  }

  static _waring(msg: any) {
    this.waring(msg);
  }

  static _confirm(msg: any, callback: any) {
    this.confirm(msg, callback);
  }


  static error(tips: any) {
    const w: any = window;
    w.sweetAlert('操作异常', tips, 'error');
  }

  static success(content: any) {
    const w: any = window;
    if (!content) {
      content = '';
    }
    // swal({   title: '操作成功!',   text: ' ',   timer: 2000,   showConfirmButton: false });
    w.swal('操作成功!', content, 'success');
  }
 static warningTime(content: any, callback: any) {
    const w: any = window;
    w.swal({
      title: content,
      text: '',
      timer: 2000
    }).then(
         () => {
          callback.call();
         },
        // // handling the promise rejection
        // function (dismiss) {
        //     if (dismiss === 'timer') {
        //         console.log('I was closed by the timer')
        //     }
        // }
    );
 }

  static waring(content: any) {
    const w: any = window;
    if (!content) {
      content = '';
    }
    w.swal({ title: content, text: '', type: 'warning' });
    // swal({ title: content,   text: ' ',   timer: 2000,   showConfirmButton: false });
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

}
