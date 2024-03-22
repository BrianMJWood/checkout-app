import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CheckoutService } from 'src/app/services/checkout.service';

const mockDeals = [
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

class MockCheckoutService {
  currentDeals = mockDeals;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let checkoutService: CheckoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display deals from CheckoutService', () => {
    expect(component.currentDeals.length).toBe(5);
  });

  it('should render each deal in the template', () => {
    const compiled = fixture.debugElement.nativeElement;
    const dealElements = compiled.querySelectorAll('.deal');
    expect(dealElements.length).toBe(5);
    expect(dealElements[0].textContent).toContain('Apple:  Buy 1 Get 1 Free ');
    expect(dealElements[1].textContent).toContain(
      'Banana:  3 for the price of 2 '
    );
    expect(dealElements[2].textContent).toContain('Carrot:  20% off ');
    expect(dealElements[3].textContent).toContain('Durian:  £0.50 off ');
    expect(dealElements[4].textContent).toContain(
      'Eggplant:  Buy 3, get 10% off '
    );
  });
});
