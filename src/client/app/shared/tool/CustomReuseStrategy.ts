import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

/**
 * 记录上一页面数据，不重新加载
 */
export class CustomReuseStrategy implements RouteReuseStrategy {

  static RouteArr: any = [
      'demo/tree/table',
      'user'
  ];


  static _cacheRouters: { [key: string]: DetachedRouteHandle } = {};

  static removeCache(path: string) {
    console.log('CustomReuseStrategy removeCache : ', path);
    CustomReuseStrategy._cacheRouters[path] = undefined;
  }
  static removeAll() {
    for (const key in CustomReuseStrategy._cacheRouters) {
      this.removeCache(key);
    }
  }
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return this.isInclude(route);
    }
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
      CustomReuseStrategy._cacheRouters[route.routeConfig.path] = handle;
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!CustomReuseStrategy._cacheRouters[route.routeConfig.path];
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return CustomReuseStrategy._cacheRouters[route.routeConfig.path];
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

  isInclude(route: ActivatedRouteSnapshot) {
    let retn = false;
    console.log('route.url.path   : ', route.routeConfig.path);
    CustomReuseStrategy.RouteArr.forEach((path: any) => {
      if (route.routeConfig.path === path) {
        retn = true;
      }
    });
    return retn;
  }
}
