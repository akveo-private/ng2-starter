import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { UrlUtilService } from './services/url-util.service';
import { ConfigService } from './services/config.service';
import { FileHelperService } from './services/file-helper.service';
import { ImagePipe } from './pipes/image.pipe';


@NgModule({
  imports: [CommonModule],
  declarations: [
    ImagePipe
  ],
  exports: [
    ImagePipe
  ]
})
export class UtilsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: UtilsModule,
      providers: [
        UrlUtilService,
        ConfigService,
        FileHelperService
      ]
    };
  }
}
