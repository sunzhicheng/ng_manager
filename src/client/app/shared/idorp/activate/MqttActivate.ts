import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MqttAvtivate implements CanActivateChild {

    constructor(public router: Router,
    ) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        console.log('MqttAvtivate  将要转向的路由 :' + childRoute.routeConfig.path);
        const component = childRoute.component;
        return true;
    }
}
