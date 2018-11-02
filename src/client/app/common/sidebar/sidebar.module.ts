import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { SysEvent } from '../../shared/idorp/event/sys.event';
import { SidebarService } from './sidebar.service';




@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  providers: [SysEvent, SidebarService]
})
export class SideBarModule { }
