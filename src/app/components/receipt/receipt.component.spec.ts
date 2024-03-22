import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceiptComponent } from './receipt.component';
import { CheckoutService } from '../../services/checkout.service';

class MockCheckoutService {
  receipt = {
    items: [
      { product: { name: 'Apple', price: 0.5 }, quantity: 3 },
      { product: { name: 'Banana', price: 0.75 }, quantity: 2 },
    ],
    totalPrice: 3.75,
  };
}

describe('ReceiptComponent', () => {
  let component: ReceiptComponent;
  let fixture: ComponentFixture<ReceiptComponent>;
  let checkoutService: CheckoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptComponent],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptComponent);
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display total price from checkoutService', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.receipt p').textContent).toContain(
      'Total Price: £3.75'
    );
  });

  it('should list all items from checkoutService.receipt', () => {
    const compiled = fixture.debugElement.nativeElement;
    const items = compiled.querySelectorAll('.receipt ul li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Apple - Quantity: 3');
    expect(items[1].textContent).toContain('Banana - Quantity: 2');
  });
});
