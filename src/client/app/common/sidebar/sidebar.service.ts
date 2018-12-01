import { HttpService } from './../../shared/service/HttpService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DyBaseService } from '../../shared/service/IdBaseService';
import { SysEvent } from '../../shared/event/sys.event';

@Injectable()
export class SidebarService extends DyBaseService {

  public api: any = {
    hasMenu: '/sys/menu/hasMenu',
  };
  request_routes: any = [];

  constructor(public httpService: HttpService,
    private sysEvent: SysEvent
  ) {
    super(httpService);
}
  hasMenu(entry: any): Observable<any> {
    return Observable.create((observer: any) => {
        this.httpService.httpRequest(this.api.hasMenu, entry).subscribe(
            (message: any) => observer.next(message),
            (error: any) => observer.error(error)
        );
    });
  }

}

