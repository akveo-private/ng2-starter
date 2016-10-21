import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from './config.service';
import { ResponseOptions, Response } from '@angular/http';
import { layoutPaths } from '../../theme/theme.constants';

@Injectable()
export class FileHelperService {

  constructor(private authService: AuthService, private config: ConfigService) {
  }
  
  generateImageUrl(file, defaultImage: string = 'no-photo', defaultExtension = '.png') {
    if (file && file) {
      return this.config.getConfigParam('filesEndpoint') +
        '/' + file.destination + '/' + file.filename;
    }

    return layoutPaths.images.root + defaultImage + defaultExtension;
  }

  getUploadSettings(endPoint = '/upload'): any {
    return {
      url: this.config.getConfigParam('apiEndpoint') + endPoint,
      customHeaders: {'Authorization': 'Bearer ' + this.authService.getAuthToken()}
    };
  }

  getFileFromUploaderResponse(data: any): any {
    let file;

    if (data['done'] && data['status'] < 400) {
      let res = new Response(new ResponseOptions({
        body: data.response,
        status: data.status,
      }));
      let fileData = res.json() || {file: null};
      file = fileData.file;
    }

    return file;
  }

}
