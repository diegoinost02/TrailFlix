import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PipeUrlService {

  constructor(private sanitizer: DomSanitizer) { }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url); ///Hace que sea segura la url
  }


}
