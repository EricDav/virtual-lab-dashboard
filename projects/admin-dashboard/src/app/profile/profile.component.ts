import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  errorMessage = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  passwordErrorMessage = '';
  showSuccess = false;
  showPasswordSuccess = false;
  isError = false;
  user = {
    id:'',
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    name: ''
  };

  token = '';
  newPassword = '';
  oldPassword = '';
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const names = user.name.split(' ');
    this.token = localStorage.getItem('currentUser');
    this.user.firstName = names[0];
    this.user.lastName = names[1];
    this.user.email = user.email;
    this.user.name = user.name;
    this.user.id = user.id;
    this.user.phone_number = user.phone_number ? user.phone_number : '';
  }

  onKeyF(event: any) {
    this.user.firstName = event.target.value;
  }

  onKeyL(event: any) {
    this.user.lastName = event.target.value;
  }

  onKeyE(event: any) {
    this.user.email = event.target.value;
  }

  onKeyP(event: any) {
    this.user.phone_number = event.target.value;
  }

  onClick() {
    this.errorMessage = {firstName: '', lastName: '', email: '', phoneNumber: ''};
    this.validate();
    if (this.isError) {
      return;
    }

    let name = this.user.firstName + ' ' + this.user.lastName;
    const data = {
      name: name,
      email: this.user.email,
      phone_number: this.user.phone_number,
      token: this.token
    };

    this.userService.updateProfile(data)
    .pipe(first())
    .subscribe(
        data =>  {
          if (data.success) {
            localStorage.setItem('user', JSON.stringify(this.user));
            this.showSuccess = true;
          } else {
            this.displayServerError(data.message);
            this.showSuccess = false;
          }
          
        },
        error => {
            // this.loading = false;
            // this.buttonText = 'Submit Now';
            let errorMessage = error.error.message;

           this.displayServerError(errorMessage);

            // this.loading = false;
        });

  }

  closeSuccess() {
    this.showSuccess = false;
  }

  displayServerError(errorMessage) {
    if (errorMessage.hasOwnProperty('firstName')) {
      this.errorMessage.firstName = 'First' + errorMessage.firstName;
    }

    if (errorMessage.hasOwnProperty('lastName')) {
      this.errorMessage.lastName = 'Last' + errorMessage.lastName;
    }

    if (errorMessage.hasOwnProperty('email')) { 
      this.errorMessage.email = errorMessage.email;
    }
  }

  onKeyNewPassword(event: any) {
    this.newPassword = event.target.value;
  }

  onKeyOldPassword(event: any) {
    this.oldPassword = event.target.value;
  }

  updatePassword() {
    this.passwordErrorMessage = '';
    if (!this.newPassword.trim()) {
      this.passwordErrorMessage = 'New password is required';
    } else if (!this.oldPassword.trim()) {
      this.passwordErrorMessage = 'Old password is required';
    }

    if (this.passwordErrorMessage) {
      return;
    }

    const data = {
      new_password: this.newPassword,
      old_password: this.oldPassword,
      token: this.token
    };

    this.userService.updatePassword(data)
    .pipe(first())
    .subscribe(
        data =>  {
          console.log(data);
          if (data.success) {
            this.showPasswordSuccess = true;
          } else {
            this.showPasswordSuccess = false;
            this.passwordErrorMessage = data.message;
          }
          
        },
        error => {
            // this.loading = false;
            // this.buttonText = 'Submit Now';
            let errorMessage = error.error.message;

           this.displayServerError(errorMessage);
        });
  }

  validate() {
    if (!this.user.firstName.trim()) {
      this.errorMessage.firstName = 'First name is required';
    }

    if (!this.user.lastName.trim()) {
      this.errorMessage.lastName = 'Last name is required';
    }

    if (!this.user.email.trim()) {
      this.errorMessage.email = 'Email is required';
    }

    if (!this.user.phone_number.trim()) {
      this.errorMessage.phoneNumber = 'Phone number is required';
    } else if (this.user.phone_number.length != 11) {
      this.errorMessage.phoneNumber = 'Invalid phone number. Phone number should be 11 digits';
    }

    if (this.errorMessage.firstName || this.errorMessage.lastName || this.errorMessage.email || this.errorMessage.phoneNumber) {
      this.isError = true;
    } else {
      this.isError = false;
    }
  }


}
