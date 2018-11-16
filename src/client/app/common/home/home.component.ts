import { Component, ViewEncapsulation, AfterContentInit, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginService } from '../../idsys/login/login.service';
import { BaseComponent } from '../../shared/idorp/component/BaseComponent';
import { CustomReuseStrategy } from '../../shared/tool/CustomReuseStrategy';
import { IdTool } from '../../shared/tool/IdTool';
import { LocalStorageCacheService } from '../../shared/idorp/cache/localstorage.service';
declare const $: any;

@Component({
  moduleId: module.id,
  selector: 'home-cmp',
  templateUrl: 'home.component.html',
  encapsulation: ViewEncapsulation.None,
  // viewProviders: [LoginService, ToolHttpComponent,ModalsComponent],
  // directives: [ROUTER_DIRECTIVES, TopNavComponent,FootNavComponent, SidebarComponent]
})

export class HomeComponent extends BaseComponent implements OnInit {
  @ViewChild(SidebarComponent)
  public sidebar: SidebarComponent;
  ngOnInit() {
    $('home-cmp').addClass('vbox');
  }

  searchSidebar(keyword: any) {
    this.sidebar.hasMenu(keyword);
  }

}
