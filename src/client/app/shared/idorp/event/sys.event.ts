import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Events } from '../../tool/events';

/**
 * 事件处理
 * @description
 */
@Injectable()
export class SysEvent extends Events {
  private readonly sys_cache_route = 'sys:cache:route';

  publishRoute(data: any) {
    this.publish(this.sys_cache_route, data);
  }
  subscribeRoute(...handlers: Function[]) {
    this.subscribe(this.sys_cache_route, ...handlers);
  }
}
