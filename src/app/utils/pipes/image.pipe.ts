import { Pipe, PipeTransform } from '@angular/core';
import { FileHelperService } from '../services/file-helper.service';

@Pipe({name: 'image'})
export class ImagePipe implements PipeTransform {

  constructor(private fileHelper: FileHelperService) {
  }

  transform(input: any, defaultImage: string = 'no-photo', defaultExtension = '.png'): string {
    return this.fileHelper.generateImageUrl(input, defaultImage, defaultExtension);
  }
}
