import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { PromptUtil } from '../idorp/providers/PromptUtil';

@Injectable()
export class AuthService implements CanActivate {

    constructor(public router: Router) { }

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
            if (localStorage.ptType === 'operate') {
                permissoin = 'operate:' + permissoin;
            } else if (localStorage.ptType === 'business') {
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
                PromptUtil._error('访问的路径没有权限');
                const ptType = localStorage.getItem('ptType');
                if (ptType) {
                    this.router.navigateByUrl(ptType + '/login');
                } else {
                    this.router.navigateByUrl('/');
                }
            }
            return isHasPermission;
        }

}
