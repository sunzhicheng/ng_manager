import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

/**
 * 记录上一页面数据，不重新加载
 */
export class CustomReuseStrategy implements RouteReuseStrategy {

  handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // console.debug('CustomReuseStrategy:shouldDetach', route);
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // console.debug('CustomReuseStrategy:store:', route.routeConfig.path);
    this.handlers[route.routeConfig.path] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // console.debug('CustomReuseStrategy:shouldAttach', route);
    return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // console.debug('CustomReuseStrategy:retrieve', route);
    return this.handlers[route.routeConfig.path]; //从暂存处取回
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    //在此处可以取得跳转前和跳转后的路由路径
    // console.debug('CustomReuseStrategy:shouldReuseRoute', future, curr);
    return future.routeConfig === curr.routeConfig;
  }

  removeCache(path: string) {
    console.log('CustomReuseStrategy removeCache : ', path);
    this.handlers[path] = undefined;
  }
}
