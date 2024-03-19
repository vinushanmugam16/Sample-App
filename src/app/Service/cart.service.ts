import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  constructor(private http:HttpClient) { }
  fooditemsUrl=environment.foodItemsUrl;
  cartUrl = environment.addCart;

  public getItem(){
    return this.http.get(this.fooditemsUrl);
  }

  public createCart(addingCart: Item) {
    return this.http.post(this.cartUrl, addingCart);
  }

  public getCart(){
    return this.http.get(this.cartUrl);   
  }

  public deleteItem(id){
    return this.http.delete(`${this.cartUrl}/${id}`);
  }

  public deleteAll(){
    this.http.delete(this.cartUrl)
    .subscribe(()=>console.log('Deleted'))
  }
}
