import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 表单验证
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// 演示模块，不需要可以移除
// 流媒体
import { VideoModule } from './examples/video/video.module';
// 图形报表
import { HighchartsExampleModule } from './examples/highcharts/highcharts.module';
// MQTT WS 模块
import { MqttModule } from './examples/mqtt/mqtt.module';
// 页面路由数据缓存策略
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './shared/tool/CustomReuseStrategy';
// 网页Title控制
import { Title } from '@angular/platform-browser';
import { HomeModule } from './common/home/home.module';


@NgModule({
  imports: [BrowserModule, ReactiveFormsModule,
    HttpClientModule, AppRoutingModule,
    HomeModule,
    VideoModule,
    HighchartsExampleModule,
    MqttModule,
    SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: ''
  },
  Title,
  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
