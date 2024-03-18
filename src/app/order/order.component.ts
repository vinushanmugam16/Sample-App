import { Component, OnInit } from '@angular/core';
import { AddcartService } from '../Service/addcart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public foodItem = [];
  public totalPrice = 0;
  constructor(private addingtoCart: AddcartService) { }

  ngOnInit() {
    this.addingtoCart.getItemListadd()
      .subscribe((response) => {
        this.foodItem = response;
        this.totalPrice = this.totalAll();
      })
  }

  public totalAll() {
    this.foodItem.map((value) => {
      this.totalPrice += value.price*value.quantity ;
    })
    return this.totalPrice;
  }

  public orderSelected() {
    alert('Selected items are ordered Successfully!');
    this.addingtoCart.removeAll();
    this.totalPrice = 0;
  }
}