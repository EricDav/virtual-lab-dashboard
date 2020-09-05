import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  reference = '';
  amount = '';
  showSuccess = false;
  showFailure = false;
  userId = 5;
  errorMessage = '';
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  paymentCancel() {
    this.showSuccess = false;
    this.showFailure = true;
    this.errorMessage = "Payment failed";
  }

  paymentDone(event) {
    const data = {
      user_id: this.userId,
      ref: event.reference
    };
    this.userService.depositFund(data)
    .pipe(first())
    .subscribe(
        data =>  {
          console.log(data);
          if (data.success) {
            this.showSuccess = true;
            this.showFailure = false;
          } else {
            this.showSuccess = false;
            this.showFailure = true;
            this.errorMessage = data.message;
          }
        },
        error => {
          console.log(error);
        });
  }

  onKeyAmt(event) {
    this.amount = event.target.value.toString() + '00';
    console.log(this.amount);
  }

}
