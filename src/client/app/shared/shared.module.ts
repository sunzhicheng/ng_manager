import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GpbService } from './idorp/service/gpb.service';
import { HttpService } from './idorp/service/HttpService';
import { TreeService } from './idorp/service/TreeService';
import { LocalStorageCacheService } from './idorp/cache/localstorage.service';
import { SessionStorageCacheService } from './idorp/cache/sessionStorage.service';
import { UploadService } from './idorp/service/UploadService';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, FormsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        HttpService,
        UploadService,
        GpbService,
        TreeService,
        LocalStorageCacheService,
        SessionStorageCacheService,
        ]
    };
  }
}
