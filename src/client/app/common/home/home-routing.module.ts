import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OperateLoginComponent } from '../../idsys/login/operate.login.component';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: OperateLoginComponent },
      {
        path: 'home', component: HomeComponent,
        children: [
          { path: 'index', component: IndexComponent },
          // ...DemoRoutes, // demo 演示模块
        ]
      },
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
