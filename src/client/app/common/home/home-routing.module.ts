import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OperateLoginComponent } from '../../sys/login/operate.login.component';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index.component';
import { MenuRoutes } from '../../sys/menu/menu-routing';
import { UserRoutes } from '../../sys/user/user-routing';
import { DemoRoutes } from '../../examples/demo-routing';
import { MqttAvtivate } from '../../shared/activate/MqttActivate';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: OperateLoginComponent },
      {
        path: 'home', component: HomeComponent, canActivateChild: [MqttAvtivate],
        children: [
          { path: 'index', component: IndexComponent },
          ...DemoRoutes, // demo 演示模块
          ...MenuRoutes,
          ...UserRoutes,
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
