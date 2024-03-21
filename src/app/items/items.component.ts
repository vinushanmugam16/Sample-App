import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],

})
export class ItemsComponent implements OnInit {

  public cartItem;
  constructor(private cartList: CartService) { }

  ngOnInit() {
    this.cartList.getItem()
      .subscribe(response => {
        this.cartItem = response;
      })
  }
  
  public addingTocart(item) {
    this.cartList.getCart().subscribe((data: any) => {
      const foodItem = data;
      const foundItem = foodItem.find((food) =>
        food.itemName === item.itemName
      )
      if (!foundItem) {
        this.cartList.createCart(item).subscribe(() => {
          this.cartList.itemLength();
        })
      }
      else {
        this.cartList.updateQuantity(foundItem.id, foundItem).subscribe(() => {
          this.cartList.itemLength();
        })
      }
    })
  }
}

