import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { USER_BASE_URL, SERVER_URL, SERVER_URL_FILE, COMMON_FILE_UP, COMMON_FILE } from '../config/env_qz.config';
import { Router } from '@angular/router';

import { ToolGpbService } from './tool-gpb.service';
import { TOKEN_INIT } from '../config/env_qz.config';

declare function waring(content: string): void;
declare function success(content: string): void;
declare function error(content: string): void;
declare function confirm(content: string, callback: any): boolean;

declare const $: any;

/**
 * This class represents the toolbar component.
 */
@Injectable()
export class ToolHttpService {

  // 访问凭证
  accessToken: string;

  // 错误信息
  errorMessage: string;

  //session
  session: string;

  token: any;

  // 可以返回
  // canBack: boolean = false;

  // 导航控制通道
  sideBarRefreshSource = new Subject<string>();
  sideBarRefresh$ = this.sideBarRefreshSource.asObservable();

  //动态表单对象
  dyform: any = {};

  //公共数值,不相同
  unlike_num = 0;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: HttpClient,
    private toolGpbService: ToolGpbService,
    private _router: Router) {
  }

  sideBarUpdate(funGroup: string) {
    this.sideBarRefreshSource.next(funGroup);
  }


  ToBase64 = function (u8: any) {
    return btoa(String.fromCharCode.apply(null, u8));
  };

  FromBase64 = function (str: any) {
    // 过滤空字符,避免解析错误
    str = str.replace(/\s/g, '');
    return atob(str).split('').map(function (c) {
      return c.charCodeAt(0);
    });
  };

  /**
   * 提示信息
   * @param token
   * @returns {boolean}
   */
  isEx(token: any) {
    if (token.ex) {
      const error_type = token.ex.ex_type;
      error(token.ex.ex_tips);
      if (error_type === 1 || error_type === 2) {
        this._router.navigateByUrl('/');
      }
      return false;
    }
    return true;
  }

  showLoad() {
    const load: any = $('.load');
    load.show();
  }

  hideLoad() {
    const load: any = $('.load');
    load.hide();
  }

  _success() {
    this.success('');
  }

  _error(msg: any) {
    this.error(msg);
  }

  _waring(msg: any) {
    this.waring(msg);
  }

  _confirm(msg: any, callback: any) {
    this.confirm(msg, callback);
  }


  error(tips: any) {
    const w: any = window;
    w.sweetAlert('操作异常', tips, 'error');
  }

  success(content: any) {
    const w: any = window;
    if (!content) {
      content = '';
    }
    // swal({   title: '操作成功!',   text: ' ',   timer: 2000,   showConfirmButton: false });
    w.swal('操作成功!', content, 'success');
  }


  waring(content: any) {
    const w: any = window;
    if (!content) {
      content = '';
    }
    w.swal({   title: content,   text: '',   type: 'warning'});
    // swal({ title: content,   text: ' ',   timer: 2000,   showConfirmButton: false });
  }

  confirm(title: any, callback: any) {
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
    }, function (isConfirm: any) {
      if (isConfirm) {
        callback.call();
      } else {
        w.swal('已经取消！', '', 'error');
      }
    });
  }



  getImgUrl(id: any) {
    return SERVER_URL_FILE + COMMON_FILE + id;
  }

  tf(i: number) {
    return (i < 10 ? '0' : '') + i;
  }

  long2Date(lDate: number) {
    const t = new Date((Number)(lDate));
    const time_str = this.tf(t.getUTCFullYear()) + '-' + this.tf(t.getUTCMonth() + 1)
      + '-' + this.tf(t.getUTCDay()) + ' ' + this.tf(t.getUTCHours()) + ':'
      + this.tf(t.getUTCMinutes()) + ':' + this.tf(t.getUTCSeconds());
    return time_str;
  }

  long2DateYMD(lDate: number) {
    const t = new Date((Number)(lDate));
    const time_str = this.tf(t.getUTCFullYear()) + '-' + this.tf(t.getUTCMonth() + 1)
       + '-' + this.tf(t.getUTCDay());
    return time_str;
  }

  jsonToObj(json: any) {
    return JSON.parse(json);
  }

  objToJson(obj: any) {
    return JSON.stringify(obj);
  }

  // 加载HTML模板的方法
  getTemp(url: string): Observable<any> {
    return this.http.get<string>(url).pipe(
      catchError(this.handleError)
    );
  }

  extractTemp(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    const body = res.text();
    return body || '';
  }

  /**
   * 设置token
   * @param message 接口交互协议，不能为空，必须含有token
   */
  addAccToken(message: any) {
    if (message && message.token && message.token.ext && message.token.acc_token) {
      const access_token = sessionStorage.getItem('access_token');
      const acc_source = sessionStorage.getItem('acc_source');
      const user_id = sessionStorage.getItem('user_id');
      const pt_channel_id = sessionStorage.getItem('pt_channel_id');
      if (access_token) {
        message.token.acc_token.access_token = access_token;
      }
      if (acc_source) {
        message.token.acc_source = acc_source;
      }
      if (pt_channel_id) {
        message.token.ext.pt_channel_id = { l_id: pt_channel_id };
      }
      if (user_id) {
        message.token.ext.user_id = { l_id: user_id, idType: 2 };
      }
    } else {
      console.error('addAccToken proto message fomat error!!!');
    }
  }

  /**
   * 添加会话ID，不允许传空对像
   * @param message 接口交互协议
   */
  addSessionId(message: any) {
    // console.error('addSessionId this.session : ' , this.session);
    if (this.session && message) {
      message.token.ext.pt_session_id = this.session;
      // parame.token.ext.pt_channel_id.open_id = '1';
    } else {
      console.error('addSessionId  session or message undefine!!!');
    }
  }

  /**
   * 初始会话
   * @param message 消息内容
   */
  initSession2(message: any, protoMessage: any): Observable<any> {
    return this.ajaxJson2(message, USER_BASE_URL, protoMessage);
  }

  /**
   * 接口请求方法版本2 ProtoBuf 接口使用
   * @param message 消息内容
   * @param url 接口地址
   * @param protoMessage 消息对像
   */
  ajaxJson2(message: any, url: string, protoMessage: any): Observable<any> {
    this.addAccToken(message);

    // 转 base64 新方法, 参数不在URL中不再需要EncodeURL
    const base64Str = this.toolGpbService.protoToBase64(message, protoMessage);

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('idorp-agent', 'idorp-agent-web-h5');
    // const tt1 = headers.get('idorp-agent');
    // const tt2 = headers.get('Content-Type');
    // console.log('ajaxJson2 ' , tt1, tt2);

    const me = this;
    return this.http.post(SERVER_URL + url, { 'base64': base64Str },
            {headers: headers, responseType: 'text',
      }).pipe(
        map((res: any) => {
          // console.log('ajaxJson2 response 1 : ', res);
          let body = res || '';
          // 过滤空字符,避免解析错误
          body = body.replace(/\s/g, '');
          // console.log('ajaxJson2 response string : ', body);
          return me.toolGpbService.bas64ToProto(body, protoMessage);
        }),
        catchError(this.handleError)
      );
  }

    /**
    * Handle HTTP error
    */
  handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return of(errMsg);
  }

  /**
   * 上传文件
   * @param files
   */
  filesAjax(files: any, callback: any, target: any, t: any) {
    const fileUrl = SERVER_URL_FILE + COMMON_FILE_UP;
    const me = this;
    const ComFileEntry = this.toolGpbService.getComFileEntry(function (protoMessage: any) {
      // FormData 对象
      const form = new FormData();
      const request = protoMessage.create(TOKEN_INIT);
      //添加token
      this.addAccToken(request);
      form.append('base64', encodeURIComponent(request.toBase64())); // 可以增加表单数据
      for (const i in files) {
        form.append('file' + i, files[i]); // 文件对象
      }
      // XMLHttpRequest 对象
      const xhr = new XMLHttpRequest();
      xhr.open('post', fileUrl, true);
      xhr.setRequestHeader('idorp-agent', 'idorp-agent-web');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (callback) {
            // 过滤空字符,避免解析错误
            const body = xhr.responseText.replace(/\s/g, '');
            // console.log('ajaxJson2 response string : ', body);
            const result = me.toolGpbService.bas64ToProto(body, protoMessage);
            callback.call(target, result, t); //回调函数
          }
        }
      };
      xhr.send(form);
    });
  }

  /**
   * 设置sessionStory
   * @param params
   */
  setSessionStory(params: any) {
    this.token = params.token;
    if (this.token.acc_token && this.token.acc_token.access_token) {
      const access_token = this.token.acc_token.access_token;
      sessionStorage.setItem('access_token', access_token);
    }
    if (this.token.acc_source) {
      const acc_source = this.token.acc_source;
      sessionStorage.setItem('acc_source', acc_source);
    }
    if (this.token.ext && this.token.ext.user_id) {
      const user_id = this.token.ext.user_id.l_id;
      sessionStorage.setItem('user_id', user_id);
    }

    if (this.token.ext && this.token.ext.pt_channel_id) {
      const pt_channel_id = this.token.ext.pt_channel_id.open_id;
      sessionStorage.setItem('pt_channel_id', pt_channel_id);
    }

    // console.log('getToken:', this.token);
  }

  clearSessionStory() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('acc_source');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('pt_channel_id');
  }

  buildToken(obj: any) {
    this.toolGpbService.getIToken(function (message: any) {
      const tokenNew = message.create({ ext: { pt_channel_id: {}, user_id: { idType: 2 } }, acc_token: {} });
      if (!obj.token) {
        obj.token = tokenNew;
      }
      if (!obj.token.ext) {
        obj.token.ext = tokenNew.ext;
      }

      if (!obj.token.acc_token) {
        obj.token.acc_token = tokenNew.acc_token;
      }

      if (!obj.token.ext.pt_channel_id) {
        obj.token.ext.pt_channel_id = tokenNew.ext.pt_channel_id;
      }

      if (!obj.token.ext.user_id) {
        obj.token.ext.user_id = tokenNew.ext.user_id;
      }
    });
  }

  clone(obj: any) {
    let o: any;
    if (typeof obj === 'object') {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (let i = 0, len = obj.length; i < len; i++) {
            o.push(this.clone(obj[i]));
          }
        } else {
          o = {};
          for (const j in obj) {
            o[j] = this.clone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  }


  //所有A有的属性,如果B有,就从B拷贝过来,如果B没有,保持A不变
  //E为A无论如何都不想被覆盖掉的域
  //用来为A抽取所有感兴趣的B的属性
  //A劲量抽取B的属性,A主攻
  mergeAFromB(a: any, b: any, e: any) {
    const data: any = {};
    for (const key in e) {
      data[e[key]] = '';
    }

    if (a && b) {
      for (const k in a) {
        if (e) {
          if (k in data) {
            continue;
          }
        }
        if (typeof b[k] !== 'undefined') {
          a[k] = b[k];
        }
      }
    }
    return a;
  }

  /**
   * 把b中的属性覆盖到a中
   * @param a
   * @param b
   */
  public coverAFromB(a: any, b: any) {
    for (const key in b) {
      a[key] = b[key];
    }
  }

  public getUnlike_num(): number {
    const res = this.unlike_num++;
    return res;
  }

}
