import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ShiptoComponent } from './shipto/shipto.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageUnknownComponent } from './page-unknown/page-unknown.component';
import { SharedService } from './shared.service';
import { Routes , RouterModule } from '@angular/router';  
import { FormsModule } from '@angular/forms';
import { EndComponent } from './end/end.component';
// import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

const routes : Routes = [
  {path: '', redirectTo : 'catalog', pathMatch : 'full' },
  {path: 'catalog', component: CatalogComponent },
  {path: 'category', component: CategoryComponent },
  {path: 'product', component: ProductComponent },
  {path: 'cart', component: CartComponent },
  {path: 'shipto', component: ShiptoComponent },
  {path: 'checkout', component: CheckoutComponent },
  { path: 'end', component: EndComponent },

  {path: '**' ,  component : PageUnknownComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CategoryComponent,
    ProductComponent,
    CartComponent,
    ShiptoComponent,
    CheckoutComponent,
    PageUnknownComponent,
    EndComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
    
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
