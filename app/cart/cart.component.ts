import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { CartDetailsClass } from './cart.model';
import { ShipDetailsClass } from '../shipto/shipto.model';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemParam : string;
  cartObj : any = [];
  totalPrice : [];
  // cartClassObj = CartDetailsClass.getInstance();
  // shipToObj = ShipDetailsClass.getInstance().shippingInfo;
  constructor(private url: ActivatedRoute, private http: HttpClient, private router: Router) { 
    this.url.queryParams.subscribe(param =>{
      this.itemParam = param['item'];
    })
  }

  ngOnInit() {
    console.log(this.itemParam);
    let url = "http://localhost:8000/cart?item=" + this.itemParam;
    this.http.get(url, {withCredentials: true}).subscribe(data => {
      this.cartObj = data;
      // this.cartClassObj.cart = data;
      console.log(data);
    });
  }
  changeQty(item : any, change : string){
    if(change === "-"){
      item.qty = -1;
    }
    else{
      item.qty = +1;
    }
    let url = "http://localhost:8000/cart?item=" + JSON.stringify(item);
    this.http.get(url, {withCredentials: true}).subscribe(data => {
      this.cartObj = (data);
      console.log(data);
      // this.cartClassObj.cart = data;
    });

  }
  onCheckout(){
    if (ShipDetailsClass.getInstance().shippingInfo){
      this.router.navigateByUrl('checkout');
    }else{
      this.router.navigate(['/shipto'],{queryParams : { view : this.router.url}})
    }
    
  }
  // priceChanged(num){
  //   console.log("FROM the priceChanged: " + num);
  // }
  

}
