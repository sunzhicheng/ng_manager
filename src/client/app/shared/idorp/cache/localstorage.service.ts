
import { Injectable } from '@angular/core';
import { GpbService } from '../service/gpb.service';
import { IUtils } from '../providers/IUtils';
import { PLATFORM } from '../config/app.config';

/**
 * 缓存服务
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageCacheService {

  private platform: PLATFORM = PLATFORM.OPERATOR;
  constructor(
    public toolGpb: GpbService) {
  }
  /**
   * 获取当前的平台类型
   */
  pt() {
    return this.platform;
  }
  setPT(pt: PLATFORM) {
    this.platform = pt;
  }

  saveMenu(memus: any) {
    const account = localStorage.getItem('pt_account');
    localStorage.setItem('menus_' + account, JSON.stringify(memus));
  }
  getMenu() {
    const account = localStorage.getItem('pt_account');
    return localStorage.getItem('menus_' + account);
  }
  removeMenu(account: any) {
    localStorage.removeItem('menus_' + account);
  }
  /**
   * 删除当前已经缓存的菜单
   */
  removeCurrentMenu() {
    const account = localStorage.getItem('pt_account');
    this.removeMenu(account);
  }
  isSameAccount(account_in: any) {
    const account_cache = localStorage.getItem('pt_account');
    return account_in === account_cache;
  }
  /**
   * 设置LoginInfo
   * @param params
   */
  clearLoginInfo() {
    localStorage.removeItem('access_token_base64');
    localStorage.removeItem('access_token_json');
    localStorage.removeItem('acc_source');
    localStorage.removeItem('t_ext_1');
    const account = localStorage.getItem('pt_account');
    if (account) {
      localStorage.removeItem('menus_' + account);
    }
  }
  /**
   * 设置sessionStory
   * @param params
   */
  setLoginInfo(params: any) {
    const token = params.token;
    if (token && token.acc_token && token.acc_token.access_token) {
      const access_token = token.acc_token.access_token;
      this.toolGpb.getProto('com2.IToken').subscribe(
        (protoMessage: any) => {
          const t = { acc_token: { access_token: access_token } };
          const base64 = this.toolGpb.protoToBase64(t, protoMessage);
          localStorage.setItem('access_token_base64', base64);
          localStorage.setItem('access_token_json', JSON.stringify(t));
        });
    } else {
      localStorage.removeItem('access_token_base64');
      localStorage.removeItem('access_token_json');
    }
    if (token && token.acc_source) {
      const acc_source = token.acc_source;
      localStorage.setItem('acc_source', acc_source);
    } else {
      localStorage.removeItem('acc_source');
    }
    if (token && token.ext && token.ext.t_ext_1) {
      localStorage.setItem('t_ext_1', token.ext.t_ext_1);
    } else {
      localStorage.removeItem('t_ext_1');
    }
    if (token && token.ext && token.ext.t_ext_4) {
      localStorage.setItem('headpic', IUtils.getImgUrl(token.ext.t_ext_4));
    } else {
      localStorage.removeItem('headpic');
    }
    if (token && token.ext && token.ext.pt_account) {
      if (!this.isSameAccount(token.ext.pt_account)) {
        this.removeCurrentMenu();
      }
      localStorage.setItem('pt_account', token.ext.pt_account);
    } else {
      localStorage.removeItem('pt_account');
    }
  }
  getToken(tokenType: string = 'base64') {
    let tokenKey = 'access_token_base64';
    if (tokenType === 'json') {
      tokenKey = 'access_token_json';
    }
    const access_token = localStorage.getItem(tokenKey);
    if (!access_token) {
      if (tokenType === 'json') {
        return JSON.stringify({});
      } else {
        return '';
      }
    } else {
      return access_token;
    }
  }


}

