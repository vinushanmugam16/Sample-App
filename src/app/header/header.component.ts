import { Component } from '@angular/core';
import { UserService } from '../Service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../Service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public today = Date.now();
  public totalItem = 0;
  constructor(public cart: CartService,
    public user: UserService,
    public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en')
  }

  public logoutPage() {
    this.user.logout();
  }

  public switchLang(lang: string) {
    this.translate.use(lang)
  }
}
