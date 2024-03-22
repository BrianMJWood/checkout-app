import { Component, OnInit } from '@angular/core';
import { CheckoutService, Deal } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentDeals: Deal[] = [];

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.currentDeals = this.checkoutService.currentDeals;
  }
}
