import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  id : string;
  category : any;
  constructor(private url: ActivatedRoute, private http: HttpClient) { 
    this.url.queryParams.subscribe(param =>{
      this.id = param['id']
      
    })
  }

  ngOnInit() {
    let url = "http://localhost:8000/list?id=" + this.id;
    this.http.get(url).subscribe(data=>{
      this.category = data;
    })
  }
  

}
