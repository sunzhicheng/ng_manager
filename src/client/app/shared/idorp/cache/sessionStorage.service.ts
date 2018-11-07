
import { Injectable } from '@angular/core';
import { GpbService } from '../service/gpb.service';

/**
 * 缓存服务
 */
@Injectable({ providedIn: 'root' })
export class SessionStorageCacheService {

  constructor(
    public toolGpb: GpbService) {
  }
  setActiveMenu(menuRute: any) {
    sessionStorage.setItem('active_menu', menuRute);
  }
  getActiveMenu() {
    return sessionStorage.getItem('active_menu');
  }

}

