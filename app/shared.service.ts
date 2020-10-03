import { Injectable } from '@angular/core';
// import { ShipDetailsClass } from './shipto/shipto.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private static instance: SharedService;
  
  shippingInfo: any;
  private constructor() {
  }
  static getInstance(): SharedService {
    if (!SharedService.instance) {
      SharedService.instance = new SharedService();
    }

    return SharedService.instance;
  }
}
