import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Angular4PaystackModule } from 'angular4-paystack';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GeneratePinComponent } from './generate-pin/generate-pin.component';
import { PinsComponent } from './pins/pins.component';
import { CreateSchoolComponent } from './create-school/create-school.component';
import { SchoolsComponent } from './schools/schools.component';
import { ActivationComponent } from './activation/activation.component';
import { ActivationKeysComponent } from './activation-keys/activation-keys.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransfersComponent } from './transfers/transfers.component';
import { DepositComponent } from './deposit/deposit.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SingleSchoolComponent } from './single-school/single-school.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    GeneratePinComponent,
    PinsComponent,
    CreateSchoolComponent,
    SchoolsComponent,
    ActivationComponent,
    ActivationKeysComponent,
    TransactionListComponent,
    TransfersComponent,
    DepositComponent,
    TeachersComponent,
    SingleSchoolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Angular4PaystackModule.forRoot('pk_test_f2567919a7669b9ab54289fabeea2c6555279972'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
