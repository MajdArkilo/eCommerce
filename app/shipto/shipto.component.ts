import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ShipDetailsClass } from './shipto.model';

@Component({
  selector: 'app-shipto',
  templateUrl: './shipto.component.html',
  styleUrls: ['./shipto.component.css']
})
export class ShiptoComponent implements OnInit {

  viewUrl : any;
  name : string;
  addr1 : string;
  addr2: string;
  city: string;
  prov: string;
  zip: string;
  instruction: string;
  shipToObj = ShipDetailsClass.getInstance();

  constructor(private url: ActivatedRoute, private http: HttpClient, private router : Router) { 
    this.url.queryParams.subscribe(param =>{
      this.viewUrl = param['view']
    }) 
  }

  ngOnInit() {
    if (this.shipToObj.shippingInfo) {
    let alias = this.shipToObj.shippingInfo;
    this.name = alias.name;
    this.addr1 = alias.addr1;
    this.addr2 = alias.addr2;
    this.city = alias.city;
    this.prov = alias.prov;
    this.zip = alias.zip;
    this.instruction = alias.instruction;
    }
    
    
  }

  onSubmit(){
    // console.log(event)
    // to make the fields mandatory

    if (!this.name || !this.addr1 || !this.city || !this.prov || !this.zip || !this.instruction){
      alert("Inputs marked '*' are required!");
    }else{
    
      this.shipToObj.shippingInfo = {
        name : this.name,
        addr1 : this.addr1,
        addr2 : this.addr2,
        city: this.city,
        prov: this.prov,
        zip: this.zip,
        instruction: this.instruction

      };  
    this.router.navigateByUrl(this.viewUrl);
    console.log(this.shipToObj.shippingInfo)
    }

  }
  
}
