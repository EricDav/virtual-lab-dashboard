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
  token = '';
  isLoading = false;
  btnText = 'Transfer';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
  }

  onKeyEmail(event: any) {
    this.userEmail = event.target.value;
  }

  onKeyAmt(event: any) {
    this.amount = event.target.value.toString();
  }

  onClick() {
    this.showError = false;
    this.showSuccess = false;
    const data = {
      email: this.userEmail,
      amount: this.amount,
      token: this.token
    };

    if (!this.userEmail.trim()) {
      this.showError = true;
      this.showSuccess = false;
      this.errorMessage = 'User email is required';
      return;
    }

    if (!this.amount.trim()) {
      this.showError = true;
      this.showSuccess = false;
      this.errorMessage = 'Amount is required';
      return;
    }
    this.isLoading = true;
    this.btnText = 'Transferring...';
    this.userService.transferFund(data)
    .pipe(first())
    .subscribe(
        data =>  {
          this.isLoading = false;
          this.btnText = 'Transfer';
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
          this.isLoading = false;
          this.btnText = 'Transfer';
          console.log(error);
        });
  }

}
