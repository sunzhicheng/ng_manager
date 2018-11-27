import { HttpService } from './../../shared/service/HttpService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DyBaseService } from '../../shared/service/IdBaseService';
import { GpbService } from '../../shared/service/gpb.service';
import { SysEvent } from '../../shared/event/sys.event';

@Injectable()
export class SidebarService extends DyBaseService {

  public api: any = {
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
        this.httpService.httpRequest(this.api.hasMenu, entry, protoMessage).subscribe(
            (message: any) => observer.next(message),
            (error: any) => observer.error(error)
        );
    });
  }

}

