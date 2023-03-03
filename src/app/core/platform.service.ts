import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  isBrowser!: boolean;
  isServer!: boolean;

  constructor(@Inject(PLATFORM_ID) plateformId: Object) { 
    this.isBrowser = isPlatformBrowser(plateformId)
    this.isServer = isPlatformServer(plateformId)
  }
}
