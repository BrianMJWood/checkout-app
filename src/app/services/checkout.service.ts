import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Receipt } from '../models/receipt';

export interface Deal {
  name: string;
  product: string;
  deal: string;
  percentage?: number;
  discount?: number;
  bulkQuantity?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  public receipt: Receipt = new Receipt();
  public currentDeals: Deal[] = [
    { name: 'Buy One Get One Free', product: 'Apple', deal: 'BOGOF' },
    { name: '3 for 2', product: 'Banana', deal: '3for2' },
    {
      name: 'Percentage Off',
      product: 'Carrot',
      deal: 'percentageOff',
      percentage: 20,
    },
    {
      name: 'Fixed Discount',
      product: 'Durian',
      deal: 'fixedDiscount',
      discount: 0.5,
    },
    {
      name: 'Bulk Discount',
      product: 'Eggplant',
      deal: 'bulkDiscount',
      bulkQuantity: 3,
      percentage: 10,
    },
  ];

  constructor() {}

  addQuantity(product: Product): void {
    let receiptItem = this.receipt.items.find(
      (item) => item.product.name === product.name
    );

    if (receiptItem) {
      receiptItem.quantity += 1;
    }
    this.applyDeals();
  }

  removeQuantity(product: Product): void {
    let receiptItem = this.receipt.items.find(
      (item) => item.product.name === product.name
    );

    if (receiptItem) {
      receiptItem.quantity -= 1;
    }
    this.applyDeals();
  }

  removeProduct(product: Product): void {
    let receiptItem = this.receipt.items.find(
      (item) => item.product.name === product.name
    );

    if (receiptItem) {
      const index = this.receipt.items.indexOf(receiptItem);
      this.receipt.items.splice(index, 1);
    }
    this.applyDeals();
  }

  public scanItem(product: Product): void {
    let receiptItem = this.receipt.items.find(
      (item) => item.product.name === product.name
    );

    if (!receiptItem) {
      this.receipt.items.push({ product, quantity: 1 });
    } else {
      receiptItem.quantity += 1;
    }

    this.applyDeals();
  }

  public applyDeals(): void {
    this.receipt.totalPrice = 0;

    this.receipt.items.forEach((item) => {
      const deal = this.currentDeals.find(
        (deal) => deal.product === item.product.name
      );

      if (deal) {
        switch (deal.deal) {
          case 'BOGOF':
            this.receipt.totalPrice +=
              item.product.price * Math.ceil(item.quantity / 2);
            break;
          case '3for2':
            this.receipt.totalPrice +=
              item.product.price * Math.ceil((2 * item.quantity) / 3);
            break;
          case 'percentageOff':
            this.receipt.totalPrice +=
              item.product.price *
              item.quantity *
              (1 - (deal.percentage || 0) / 100);
            break;
          case 'fixedDiscount':
            this.receipt.totalPrice +=
              (item.product.price - (deal.discount || 0)) * item.quantity;
            break;
          case 'bulkDiscount':
            if (item.quantity >= (deal.bulkQuantity || 0)) {
              this.receipt.totalPrice +=
                item.product.price *
                item.quantity *
                (1 - (deal.percentage || 0) / 100);
            } else {
              this.receipt.totalPrice += item.product.price * item.quantity;
            }
            break;
        }
      } else {
        this.receipt.totalPrice += item.product.price * item.quantity;
      }
    });
  }

  public generateReceipt(): Receipt {
    return this.receipt;
  }
}
