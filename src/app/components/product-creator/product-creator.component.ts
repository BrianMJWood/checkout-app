import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css'],
})
export class ProductCreatorComponent implements OnInit {
  newProductName: string = '';
  newProductPrice: any;
  checkoutService: CheckoutService;

  constructor(checkoutService: CheckoutService) {
    this.checkoutService = checkoutService;
  }
  ngOnInit(): void {}

  addProduct(): void {
    if (this.newProductName.trim() !== '' && this.newProductPrice > 0) {
      const newProduct = new Product(this.newProductName, this.newProductPrice);
      this.checkoutService.scanItem(newProduct);

      this.newProductName = '';
      this.newProductPrice = '';
    } else {
      alert('Please enter a valid product name and price.');
    }
  }
}
