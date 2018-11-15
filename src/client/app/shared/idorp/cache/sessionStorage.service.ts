
import { Injectable } from '@angular/core';
import { IUtils } from '../providers/IUtils';

/**
 * 缓存服务
 */
@Injectable({ providedIn: 'root' })
export class SessionStorageCacheService {

    setActiveMenu(menuRute: any) {
        sessionStorage.setItem('active_menu', menuRute);
    }
    getActiveMenu() {
        return sessionStorage.getItem('active_menu');
    }

    setPermissions(permissions: any) {
        sessionStorage.setItem('permissions', permissions);
    }
    getPermissions() {
        return sessionStorage.getItem('permissions');
    }
    /**
     * 查看是否有权限
     * @param permission
     */
    hasPermission(permission: any) {
        let isHas = false;
        const permissions = sessionStorage.permissions;
        if (IUtils.isEmpty(permissions)) {
            isHas = false;
        } else {
            permissions.split(',').forEach((p: any) => {
                if (permission === p) {
                    isHas = true;
                }
            });
        }
        return isHas;
    }

}

