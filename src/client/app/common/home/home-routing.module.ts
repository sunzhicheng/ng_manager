import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OperateLoginComponent } from '../../idsys/login/operate.login.component';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index.component';
import { IdSysMenuRoutes } from '../../idsys/idsysmenu/idsysmenu-routing';
import { IdSysAcountRoutes } from '../../idsys/idsysappacount/idsysappacount-routing';
import { DemoRoutes } from '../../examples/demo-routing';
import { MqttAvtivate } from '../../shared/idorp/activate/MqttActivate';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: OperateLoginComponent },
      {
        path: 'home', component: HomeComponent, canActivateChild: [MqttAvtivate],
        children: [
          { path: 'index', component: IndexComponent },
          ...DemoRoutes, // demo 演示模块
          ...IdSysMenuRoutes,
          ...IdSysAcountRoutes,
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
