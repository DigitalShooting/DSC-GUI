import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ViewsModule } from './views/views.module';

import { DscApiService } from "./dsc-api.service";
import { DscAPI_Token, DscAPIInterface } from "./views/dsc/api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
  ],
  providers: [
    { provide: DscAPI_Token, useExisting: DscApiService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
