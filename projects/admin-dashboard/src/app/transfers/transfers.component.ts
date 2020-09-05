import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
  userEmail = '';
  amount = '';
  showSuccess = false;
  showError = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onKeyEmail(event: any) {
    this.userEmail = event.target.value;
  }

  onKeyAmt(event: any) {
    this.amount = event.target.value.toString();
  }

  onClick() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5OTI0MjkxNn0.KTP92kc3hcE6PzM3GatLthMZCHFb_oy_oIbEChR9sP4';
    const data = {
      email: this.userEmail,
      amount: this.amount,
      token: token
    };
    this.userService.transferFund(data)
    .pipe(first())
    .subscribe(
        data =>  {
          if (data.success) {
            this.showSuccess = true;
            this.showError = false;
          } else {
            this.showSuccess = false;
            this.showError = true;
            this.errorMessage = data.message;
          }
        },
        error => {
          console.log(error);
        });
  }

}
