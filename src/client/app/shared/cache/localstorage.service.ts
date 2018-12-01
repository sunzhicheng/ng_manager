
import { Injectable } from '@angular/core';
import { IdTool } from '../tool/IdTool';
import { PLATFORM } from '../config/app.config';
import { ToolAlert } from '../tool/ToolAlert';

/**
 * 缓存服务
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageCacheService {

  private platform: PLATFORM = PLATFORM.OPERATOR;
  /**
   * 获取当前的平台类型
   */
  pt() {
    return this.platform;
  }
  setPT(pt: PLATFORM) {
    this.platform = pt;
  }

  saveMenu(menus: any) {
    if (menus) {
      const account = this.getAccount();
      localStorage.setItem('menus_' + account, JSON.stringify(menus));
    }
  }
  getMenu() {
    const account = this.getAccount();
    return localStorage.getItem('menus_' + account);
  }
  removeMenu(account: any) {
    if (account) {
      localStorage.removeItem('menus_' + account);
    }
  }
  /**
   * 删除当前已经缓存的菜单
   */
  removeCurrentMenu() {
    const account = this.getAccount();
    this.removeMenu(account);
  }
  isSameAccount(account_in: any) {
    const account_cache = this.getAccount();
    return account_in === account_cache;
  }
  getAccount() {
    const userInfo = this.getUserInfo();
    const account = userInfo.account;
    return account;
  }
  /**
   * 获取用户信息的json
   * @returns
   * @memberof LocalStorageCacheService
   */
  getUserInfo() {
    const userInfo = localStorage.getItem('userinfo');
    if (userInfo) {
      return JSON.parse(userInfo);
    } else {
      ToolAlert.login();
    }
  }
  /**
   * 设置LoginInfo
   * @param params
   */
  clearLoginInfo() {
    const account = this.getAccount();
    this.removeMenu(account);
    localStorage.removeItem('userInfo');
  }
  /**
   * 设置sessionStory
   * @param params
   */
  setUserInfo(user: any) {
    if (user) {
      localStorage.setItem('userinfo', JSON.stringify(user));
      if (user.account) {
        if (!this.isSameAccount(user.account)) {
          this.removeCurrentMenu();
        }
      }
    } else {
      localStorage.removeItem('userinfo');
    }
  }




}

