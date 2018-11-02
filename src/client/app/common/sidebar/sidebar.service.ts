import { IDCONF } from './../../shared/idorp/config/app.config';
import { HttpService } from './../../shared/idorp/service/HttpService';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL_GEN } from '../../shared/idorp/config/env.config';
import { DyBaseService } from '../../shared/idorp/service/IdBaseService';
import { GpbService } from '../../shared/idorp/service/gpb.service';
import { SysEvent } from '../../shared/idorp/event/sys.event';

@Injectable()
export class SidebarService extends DyBaseService {

  public api: any = {
    base: IDCONF().api_base,
    hasMenu: '/idsys/idsysmenu/hasMenu',
    proto: 'idsys.IdSysMenuEntry'
  };
  request_routes: any = [];

  constructor(public httpService: HttpService,
    public toolGpb: GpbService,
    private sysEvent: SysEvent
  ) {
    super(toolGpb, httpService);
}
  hasMenu(entry: any, protoMessage: any): Observable<any> {
    return Observable.create((observer: any) => {
        this.httpService.httpRequest(this.api.base + this.api.hasMenu, entry, protoMessage).subscribe(
            (message: any) => observer.next(message),
            (error: any) => observer.error(error)
        );
    });
  }

}

