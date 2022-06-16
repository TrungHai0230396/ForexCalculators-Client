import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderInfoComponent } from './components/orderInfo/orderInfo.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './components/dialog/create/create.component';
import { EditComponent } from './components/dialog/edit/edit.component';
import { DeleteComponent } from './components/dialog/delete/delete.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderInfoComponent,
    NavComponent,
    FooterComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule // using [formGroup]
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
