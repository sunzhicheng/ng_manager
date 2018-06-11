import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { CoreDemoComponent } from './core-demo.component';
import { CoreDemoRoutingModule } from './core-demo-routing.module';
import { CoreDemoService } from './core-demo-service';


@NgModule({
  imports: [SharedModule,
    CommonModule,
    FormsModule, CoreDemoRoutingModule],
  declarations: [CoreDemoComponent],
  exports: [CoreDemoComponent],
  providers: [CoreDemoService]
})
export class CoreDemoModule { }
