import { Component, OnInit } from '@angular/core';
import { ShipDetailsClass } from '../shipto/shipto.model';
// import { CartDetailsClass } from '../cart/cart.model';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
// import { ProductObject } from "./product.model";
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  // cartInfo : any;
  totalPrice : number = 0;
  shippingInfo : any;
  cartObj: any = [];
  // cartClassObj = CartDetailsClass.getInstance(); 
  shipToObj = ShipDetailsClass.getInstance();

  constructor(private url: ActivatedRoute, private http: HttpClient, private router: Router) { 
    
  }
  
  ngOnInit() {
    let url = "http://localhost:8000/cart?item=";
    this.http.get(url, { withCredentials: true }).subscribe(data => {
      this.cartObj = data;
      this.cartObj.forEach(item => {
        this.totalPrice += (item.price * item.qty); 
      });
    });
    this.shippingInfo = this.shipToObj.shippingInfo;
    // this.cartInfo = this.cartClassObj.cart;

  }
  truncate(num) {
    return num.toFixed(2);
  }
  onContinue(){
    this.router.navigateByUrl('/catalog');
  }
  onCheckout(){
    this.router.navigateByUrl('/end');
  }


}
