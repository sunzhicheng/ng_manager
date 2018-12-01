import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpService } from './service/HttpService';
import { TreeService } from './service/TreeService';
import { LocalStorageCacheService } from './cache/localstorage.service';
import { SessionStorageCacheService } from './cache/sessionStorage.service';
import { UploadService } from './service/UploadService';

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
        TreeService,
        LocalStorageCacheService,
        SessionStorageCacheService,
        ]
    };
  }
}
