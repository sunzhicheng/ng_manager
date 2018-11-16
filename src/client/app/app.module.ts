import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 表单验证
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
// 页面路由数据缓存策略
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './shared/tool/CustomReuseStrategy';
// 网页Title控制
import { Title } from '@angular/platform-browser';
import { HomeModule } from './common/home/home.module';
import { AuthAvtivate } from './shared/idorp/activate/AuthActivate';
import { MqttAvtivate } from './shared/idorp/activate/MqttActivate';
import { DefaultInterceptor } from './shared/idorp/interceptor/default.interceptor';


@NgModule({
  imports: [BrowserModule, ReactiveFormsModule,
    HttpClientModule, AppRoutingModule,
    HomeModule,
    SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: ''
  }, AuthAvtivate, MqttAvtivate,
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    Title,
  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
