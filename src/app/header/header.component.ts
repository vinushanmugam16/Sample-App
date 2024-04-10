import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../Service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  public cartLength: number;
  public userName = sessionStorage.getItem('user');

  constructor(public cart: CartService,
    public user: UserService,
    public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en')
  }

  ngOnDestroy() {
    this.logoutPage();
  }

  public logoutPage() {
    this.cart.itemLength();
    this.user.logout();
  }

  public switchLang(lang: string) {
    this.translate.use(lang)
  }
}