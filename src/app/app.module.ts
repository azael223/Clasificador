import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule } from './form/form.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormModule,
    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
