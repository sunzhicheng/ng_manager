import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mqtt } from '../../tool/Mqtt';

@Injectable()
export class MqttAvtivate implements CanActivateChild {

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        //清空mqtt 连接
        Mqtt.clear();
        return true;
    }
}
