import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
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


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'generate-pin', component: GeneratePinComponent},
  {path: 'pins', component: PinsComponent},
  {path: 'add-school', component: CreateSchoolComponent},
  {path: 'schools', component: SchoolsComponent},
  {path: 'schools/:id', component: SingleSchoolComponent},
  {path: 'activate', component: ActivationComponent},
  {path: 'activation-keys', component: ActivationKeysComponent},
  {path: 'transactions', component: TransactionListComponent},
  {path: 'transfers', component: TransfersComponent},
  {path: 'deposit', component: DepositComponent},
  {path: 'teachers', component: TeachersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
