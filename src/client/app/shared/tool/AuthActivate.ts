import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { PromptUtil } from '../idorp/providers/PromptUtil';
import { LocalStorageCacheService } from '../idorp/cache/localstorage.service';
import { PLATFORM } from '../idorp/config/app.config';

@Injectable()
export class AuthAvtivate implements CanActivate {

    constructor(public router: Router,
        public localstorage: LocalStorageCacheService,
        ) { }

    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ) {
            console.log('将要转向的路由 :' + next.routeConfig.path);
            //去除参数项  :uuid
            let path: any = next.routeConfig.path;
            if (next.routeConfig.path.indexOf(':') !== -1) {
                path = next.routeConfig.path.substring(0, next.routeConfig.path.indexOf(':') - 1);
            }
            let permissoin = path.replace('/', ':');
            //判断是商户平台 还是  运营平台
            if (this.localstorage.pt() === PLATFORM.OPERATOR) {
                permissoin = 'operate:' + permissoin;
            } else if (this.localstorage.pt() === PLATFORM.BUSINESS) {
                permissoin = 'business:' + permissoin;
            }
            const permissions = sessionStorage.permissions;
            let isHasPermission = false;
            if (permissions) {
              const permissoinArr = permissions.split(',');
              permissoinArr.forEach((p: any) => {
                if (p === permissoin) {
                    isHasPermission = true;
                }
              });
            }
            if (!isHasPermission) {
                PromptUtil.error('访问的路径没有权限');
                this.router.navigateByUrl('/');
            }
            return isHasPermission;
        }

}
