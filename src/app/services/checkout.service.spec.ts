import { CheckoutService } from './checkout.service';
import { Product } from '../models/product';

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(() => {
    service = new CheckoutService();
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  describe('scanItem', () => {
    it('should add a new item if not already in the receipt', () => {
      const product: Product = { name: 'Apple', price: 1.2 };
      service.scanItem(product);
      expect(service.receipt.items.length).toBe(1);
      expect(service.receipt.items[0].product).toEqual(product);
      expect(service.receipt.items[0].quantity).toBe(1);
    });

    it('should increase the quantity of an existing item', () => {
      const product: Product = { name: 'Banana', price: 0.5 };
      service.scanItem(product);
      service.scanItem(product);
      expect(
        service.receipt.items.find((item) => item.product.name === 'Banana')
          ?.quantity
      ).toBe(2);
    });
  });

  describe('addQuantity', () => {
    it('should increase the quantity of an existing item', () => {
      const product: Product = { name: 'Carrot', price: 0.3 };
      service.scanItem(product);
      service.addQuantity(product);
      expect(
        service.receipt.items.find((item) => item.product.name === 'Carrot')
          ?.quantity
      ).toBe(2);
    });
  });

  describe('removeQuantity', () => {
    it('should decrease the quantity of an existing item', () => {
      const product: Product = { name: 'Durian', price: 1.5 };
      service.scanItem(product);
      service.scanItem(product);
      service.removeQuantity(product);
      expect(
        service.receipt.items.find((item) => item.product.name === 'Durian')
          ?.quantity
      ).toBe(1);
    });
  });

  describe('removeProduct', () => {
    it('should remove the product entirely', () => {
      const product: Product = { name: 'Eggplant', price: 0.8 };
      service.scanItem(product);
      service.removeProduct(product);
      expect(
        service.receipt.items.find((item) => item.product.name === 'Eggplant')
      ).toBeUndefined();
    });
  });

  describe('applyDeals', () => {
    it('should apply BOGOF deal correctly', () => {
      const product: Product = { name: 'Apple', price: 1.0 };
      service.scanItem(product);
      service.scanItem(product);
      service.applyDeals();
      expect(service.receipt.totalPrice).toBe(1.0);
    });
  });
});
