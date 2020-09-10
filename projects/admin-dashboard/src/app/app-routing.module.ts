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
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_guard/auth.guard';
import { LogoutGuard } from './_guard/logout.guard';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [LogoutGuard]},
  {path: 'signup', component: SignupComponent,  canActivate: [LogoutGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'generate-pin', component: GeneratePinComponent, canActivate: [AuthGuard]},
  {path: 'pins', component: PinsComponent, canActivate: [AuthGuard]},
  {path: 'add-school', component: CreateSchoolComponent, canActivate: [AuthGuard]},
  {path: 'schools', component: SchoolsComponent, canActivate: [AuthGuard]},
  {path: 'schools/:id', component: SingleSchoolComponent, canActivate: [AuthGuard]},
  {path: 'activate', component: ActivationComponent, canActivate: [AuthGuard]},
  {path: 'activation-keys', component: ActivationKeysComponent, canActivate: [AuthGuard]},
  {path: 'transactions', component: TransactionListComponent, canActivate: [AuthGuard]},
  {path: 'transfers', component: TransfersComponent, canActivate: [AuthGuard]},
  {path: 'deposit', component: DepositComponent, canActivate: [AuthGuard]},
  {path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
