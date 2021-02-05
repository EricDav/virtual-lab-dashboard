import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  errorMessage = '';
  message = 'A verification code has been sent to your email. Enter the code below to verify your account';
  isLoading = false;
  submitText = 'Submit Now';
  verificationCode = '';
  email = '';
  resendText = 'Resend';
  isResending = false;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
    this.email = localStorage.getItem('verifyEmail')
  }

  onCodeKey (event) {
    this.verificationCode = event.target.value;
  }
  onSubmit() {
    if (!this.verificationCode.trim()) {
      this.errorMessage = 'Verification code is required';
      return;
    }
    const data = {
      email: this.email,
      token: this.verificationCode
    }
    this.errorMessage = '';
    this.message = '';
    this.isLoading = true;
    this.submitText = 'Submiting...';
    this.userService.verifyUser(data)
    .pipe(first())
    .subscribe(
        data =>  {
          this.isLoading = false;
          this.submitText = 'Submit Now';
          if (data.success) {
            this.errorMessage = '';
            this.message = 'Account verified successfully';
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 3000);
          } else {
            this.errorMessage = data.message;
          }
        },
        error => {
          this.errorMessage = 'Server error occured';
          this.isLoading = false;
          this.submitText = 'Submit Now';
        });
  }

  sendVerificationCode() {
    if (this.isResending) {
      return;
    }
    const data = {
      email: this.email,
    };

    this.errorMessage = '';
    this.message = '';
    this.isResending = true;
    this.resendText = 'Resending...';
    this.userService.sendVerificatioCode(data)
    .pipe(first())
    .subscribe(
        data =>  {
          this.isResending = false;
          this.resendText = 'Resend';
          if (data.success) {
            this.errorMessage = '';
            this.message = 'A verification code has been sent to your email. Enter the code below to verify your account';
          } else {
            this.errorMessage = data.message;
          }
        },
        error => {
          this.errorMessage = 'Server error occured';
          this.isResending = false;
          this.resendText = 'Resend';
        });
  }

}
