import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  checkoutService: CheckoutService;

  constructor(checkoutService: CheckoutService) {
    this.checkoutService = checkoutService;
  }

  ngOnInit(): void {}

  checkout(): void {
    const finalTotal = this.checkoutService.generateReceipt();

    alert(
      `Checkout complete. Final total: $${finalTotal.totalPrice.toFixed(2)}`
    );
  }
  addQuantity(product: any): void {
    this.checkoutService.addQuantity(product);
  }
  removeQuantity(product: any): void {
    this.checkoutService.removeQuantity(product);
  }
  removeProduct(product: any): void {
    this.checkoutService.removeProduct(product);
  }
}
