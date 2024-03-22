import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductCreatorComponent } from './product-creator.component';
import { CheckoutService } from 'src/app/services/checkout.service';

class MockCheckoutService {
  scanItem = jasmine.createSpy('scanItem');
}

describe('ProductCreatorComponent', () => {
  let component: ProductCreatorComponent;
  let fixture: ComponentFixture<ProductCreatorComponent>;
  let checkoutService: CheckoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ProductCreatorComponent],
      providers: [{ provide: CheckoutService, useClass: MockCheckoutService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCreatorComponent);
    component = fixture.componentInstance;
    checkoutService = TestBed.inject(CheckoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add a product when name is empty or price is invalid', () => {
    component.newProductName = '';
    component.newProductPrice = 0;
    component.addProduct();
    expect(checkoutService.scanItem).not.toHaveBeenCalled();

    component.newProductName = 'Valid Name';
    component.newProductPrice = -10;
    component.addProduct();
    expect(checkoutService.scanItem).not.toHaveBeenCalled();
  });
});
