import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
// import { ProductObject } from "./product.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id : string;
  productInfo : object;

  constructor(private url: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.url.queryParams.subscribe(param =>{
      this.id = param['id']
    })
  }

  ngOnInit() {

    let url = "http://localhost:8000/product?id=" + this.id;
    this.http.get(url).subscribe(data =>{
      this.productInfo = data;
    });

  }
  addToCart(id, qty, price){
    this.router.navigateByUrl('/cart?item=' + JSON.stringify({id: id,qty: qty,price : price}))
  }

}
