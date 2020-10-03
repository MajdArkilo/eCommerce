import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalog 
  constructor( private http: HttpClient) { }

  ngOnInit() {
    let url = "http://localhost:8000/catalog";
    this.http.get(url).subscribe((data)=>{
      // data received as a string
      this.catalog = (data);
    })

  }
  
  

}
