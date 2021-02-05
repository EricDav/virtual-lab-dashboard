import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  errorMessage = '';
  isError = false;
  showToken = false;
  isEmailSent = false;
  password = '';
  rePassword = '';
  submitText = 'Submit Now';
  isLoading = false;
  email = '';
  token = '';
  message = '';
  resendText = 'Resend';
  isResending = false;
  isToken = null;
  mainText = 'Forgot Password';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isToken = localStorage.getItem('isToken');
    if (this.isToken) {
      this.showToken = true;
      this.mainText = 'Reset Password';
    }
  }

  onSubmit() {
    if (!this.showToken) {
      if (!this.email.trim()) {
        this.errorMessage = 'Email address is required';
        return;
      }
      this.initiate({email: this.email})
    } else {
      this.message = '';
      if (!this.validateToken()) {
        return;
      }

      this.verify({token: this.token, email: localStorage.getItem('forgotPasswordEmail'), password: this.password});
    }
  }

  validateToken() {
    if (!this.token.trim()) {
      this.errorMessage = 'Token is required';
      return false;
    } else if (!this.password.trim()) {
      this.errorMessage = 'Password is required';
      return false;
    } else if (!this.token.trim()) {
      this.errorMessage = 'Re-Password is required';
      return false;
    } else if (this.password != this.rePassword) {
      this.errorMessage = 'Password does not match';
      return false;
    } else {
      return true;
    }
  }

  initiate(userData) {
    this.errorMessage = '';
    this.message = '';
    this.isLoading = true;
    this.submitText = 'Submiting...';
    this.userService.initiateForgotPasword(userData)
    .pipe(first())
    .subscribe(
        data =>  {
          this.isLoading = false;
          this.submitText = 'Submit Now';
          if (data.success) {
            this.showToken = true;
            this.message = data.message;
            localStorage.setItem('isToken', '1');
            localStorage.setItem('forgotPasswordEmail', userData.email)
            this.mainText = 'Reset Password';
          } else {
            this.errorMessage = data.message;
          }
          console.log(data);
        },
        error => {
          this.errorMessage = 'Server error occured';
          this.isLoading = false;
          this.submitText = 'Submit Now';
        });
  }

  verify(data) {
    this.errorMessage = '';
    this.message = '';
    this.isLoading = true;
    this.submitText = 'Submiting...';
    this.userService.verifyForgotPasword(data)
    .pipe(first())
    .subscribe(
        data =>  {
          this.isLoading = false;
          this.submitText = 'Submit Now';
          if (data.success) {
            this.errorMessage = '';
            this.message = 'Password updated successfully';
            localStorage.removeItem('isToken');
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          } else {
            this.errorMessage = data.message;
          }
          console.log(data);
        },
        error => {
          this.errorMessage = 'Server error occured';
          this.isLoading = false;
          this.submitText = 'Submit Now';
        });
  }

  onEmailKey(event) {
    this.email = event.target.value;
  }

  onTokenKey(event) {
    this.token = event.target.value;
  }

  onPasswordKey(event) {
    this.password = event.target.value;
  }

  onRePasswordKey(event) {
    this.rePassword = event.target.value;
  }

  resend() {
    if (this.isResending) {
      return;
    }
    this.errorMessage = '';
    this.message = '';
    this.isResending = true;
    this.resendText = 'Resending...';
    const data = {email: localStorage.getItem('forgotPasswordEmail')}
    this.userService.initiateForgotPasword(data)
    .pipe(first())
    .subscribe(
        data =>  {
          this.isResending = false;
          this.resendText = 'Resend';
          if (data.success) {
            this.message = data.message;
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

  back() {
    this.message = '';
    this.errorMessage = '';
    this.showToken = false;
    localStorage.removeItem('isToken');
    localStorage.removeItem('forgotPasswordEmail');
  }

}
