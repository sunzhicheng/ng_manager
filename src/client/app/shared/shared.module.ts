import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NameListService } from './name-list/name-list.service';
import { ToolGpbService, ToolHttpService } from './tool/index';
import { GpbService } from './idorp/service/gpb.service';
import { HttpService } from './idorp/service/HttpService';
import { IdexampleGenModule } from '../idorp/gen/idexample/idexample.gen.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [CommonModule, IdexampleGenModule],
  exports: [CommonModule, FormsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService,
        HttpService,
        GpbService,
        ToolGpbService,
        ToolHttpService]
    };
  }
}
