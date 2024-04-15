import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';
import { Router } from '@angular/router';
import { Item } from '../model/item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public foodItem: any = [];
  public food: Item[];
  public totalPrice: number = 0;
  public ordered:any=[];

  constructor(private cart: CartService, private route: Router) { }

  ngOnInit() {
    this.getFoodItem();
  }

  public getFoodItem() {
    try {
      this.cart.getCart()
        .subscribe((response) => {
          this.foodItem = response;
          this.food = this.foodItem.filter((item: { userName: string | null; }) =>
            item.userName === sessionStorage.getItem('user'))
          this.totalPrice = this.totalAll();
          sessionStorage.setItem('myorder', JSON.stringify(this.food));
        })
    }
    catch (err) {
      console.error(err);
    }
  }

  public totalAll() {
    this.food.map((value: { price: number; quantity: number; }) => {
      this.totalPrice += value.price * value.quantity;
    })
    return this.totalPrice;
  }

  public orderSelected(item: any) {
    const arrayOfObjects: any = Object.values(item).filter(items => typeof items === 'object');
    console.log(arrayOfObjects);
    this.ordered=arrayOfObjects;
    console.log(this.ordered);
  
    // this.cart.createHistory(arrayOfObjects).subscribe((data)=>console.log(data));

    this.cart.itemLength();
    this.route.navigateByUrl('payment');
  }
}