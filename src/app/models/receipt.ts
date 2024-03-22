import { Product } from './product';

export interface ReceiptItem {
  product: Product;
  quantity: number;
}

export class Receipt {
  public items: ReceiptItem[] = [];
  public totalPrice: number = 0;

  constructor() {}
}
