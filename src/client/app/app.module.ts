import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

// 演示模块，不需要可以移除
// 流媒体
import { VideoModule } from './examples/video/video.module';
// 图形报表
import { HighchartsModule } from './examples/highcharts/highcharts.module';

@NgModule({
  imports: [BrowserModule, CoreModule,
    HttpClientModule, AppRoutingModule,
    AboutModule, HomeModule,
    VideoModule,
    HighchartsModule,
    SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: ''
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
