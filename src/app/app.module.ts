import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { FormsModule } from '@angular/forms';
import { ProductCreatorComponent } from './components/product-creator/product-creator.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    ReceiptComponent,
    ProductCreatorComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
