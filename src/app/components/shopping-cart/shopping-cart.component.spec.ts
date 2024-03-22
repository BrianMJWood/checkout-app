import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CheckoutService } from '../../services/checkout.service';
import { Product } from '../../models/product';

class MockCheckoutService {
  receipt = {
    items: [],
    totalPrice: 0,
  };

  addQuantity = jasmine.createSpy('addQuantity');
  removeQuantity = jasmine.createSpy('removeQuantity');
  removeProduct = jasmine.createSpy('removeProduct');
  generateReceipt = jasmine
    .createSpy('generateReceipt')
    .and.returnValue({ items: [], totalPrice: 0 });
}

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let checkoutService: CheckoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addQuantity on CheckoutService when addQuantity is called', () => {
    const product: Product = { name: 'Test Product', price: 1.99 };
    component.addQuantity(product);
    expect(checkoutService.addQuantity).toHaveBeenCalledWith(product);
  });

  it('should call removeQuantity on CheckoutService when removeQuantity is called', () => {
    const product: Product = { name: 'Test Product', price: 1.99 };
    component.removeQuantity(product);
    expect(checkoutService.removeQuantity).toHaveBeenCalledWith(product);
  });

  it('should call removeProduct on CheckoutService when removeProduct is clicked', () => {
    const product: Product = { name: 'Test Product', price: 1.99 };
    component.removeProduct(product);
    expect(checkoutService.removeProduct).toHaveBeenCalledWith(product);
  });
});
