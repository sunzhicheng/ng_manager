import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TopnavService } from './topnav.service';
import { PromptUtil } from '../../shared/idorp/providers/PromptUtil';
import { BaseComponent } from '../../shared/idorp/component/BaseComponent';
import { LocalStorageCacheService } from '../../shared/idorp/cache/localstorage.service';

@Component({
  moduleId: module.id,
  selector: 'top-nav',
  templateUrl: 'topnav.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [TopnavService]
  // directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class TopNavComponent extends BaseComponent implements OnInit {
  app_base = '/';
  username: any;
  headpic: any;
  msgNum: any;
  msgList: any;

  msgEntry: any;


  @Output()
  public keyword: EventEmitter<any> = new EventEmitter();

  constructor(private topnavService: TopnavService,
    private localCache: LocalStorageCacheService,
    public _router: Router) {
      super();
    const appBase = '<%= APP_BASE %>';
    this.app_base = appBase;
    // console.log('TopNavComponent app_base : ', this.app_base);
  }
  ngOnInit() {
    this.username = localStorage.getItem('t_ext_1');
    this.headpic = localStorage.getItem('headpic') || 'assets/images/avatar-default.png';
  }

  get logo() {
    if (localStorage.ptType === 'operate') {
      return 'assets/images/logo-1.png';
    } else if (localStorage.ptType === 'business') {
      return 'assets/images/logo-2.png';
    } else {
      return '';
    }
  }
  search(kw: any) {
    this.keyword.emit(kw);
  }

  public outLogin() {
    this.localCache.clearSessionStory();
    const ptType = localStorage.getItem('ptType');
    if (ptType) {
      this._router.navigateByUrl(ptType + '/login');
    } else {
        this._router.navigateByUrl('/');
    }
    PromptUtil .hideLoad();
  }

  profileDetail() {
    if (this.isBusiness()) {
      this._router.navigateByUrl('home/idsysuser/detail');
    } else {
      this._router.navigateByUrl('home/idsysappacount/percenter/detail');
    }
  }

}
