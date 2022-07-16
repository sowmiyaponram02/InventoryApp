import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
