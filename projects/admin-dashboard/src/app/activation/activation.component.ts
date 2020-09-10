import { Component, OnInit } from '@angular/core';
import { ActivationService } from '../_services/activation.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  showSuccess = false;
  showError = false;
  productKey = '';
  activationKey = '';
  pin = '';
  errorMessage = '';
  token = '';
  activationType = '1';
  constructor(
    private activationService: ActivationService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
  }

  onChange(event: any) {
    this.activationType = event.target.value;
  }

  onKey(event: any) {
    this.productKey = event.target.value;
  }

  onPinKey(event: any) {
    this.pin = event.target.value;
  }

  activateByPin() {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      pin: this.pin,
      pin_user: user.email,
      product_id: this.productKey
    };

    this.activationService.activateWithPin(data) 
    .pipe(first())
    .subscribe(
        data =>  {
          if (data.success) {
            this.activationKey = data.activation_key
            this.showSuccess = true;
          } else {
             this.showError = true;
             this.errorMessage = data.message;
          }
        },
        error => {
          this.showError = true;
          this.errorMessage = 'An unknown error occured';
        });
  }

  activate() {
    const data = {
      token: this.token,
      product_id: this.productKey
    };

    this.activationService.activate(data) 
    .pipe(first())
    .subscribe(
        data =>  {
          if (data.success) {
            this.activationKey = data.activation_key
            this.showSuccess = true;
          } else {
             this.showError = true;
             this.errorMessage = data.message;
          }
        },
        error => {
          this.showError = true;
          this.errorMessage = 'An unknown error occured';
        });
  }

  validate() {
    console.log(this.productKey.trim().length);
    if (!this.productKey) {
      this.errorMessage = 'Product Key can not be empty';
    } else if (this.productKey.trim().length != 20) {
      this.errorMessage = 'Product Key must be 20 digits';
    } else if (this.activationType == '2' && !this.pin) {
      this.errorMessage = 'Pin is required';
    }

    if (this.errorMessage) {
      this.showError = true;
    }
  }

  onClick() {
    this.showError = false;
    this.errorMessage = '';
    this.validate();
    if (this.showError) {
      return;
    }
    if (this.activationType == '1') {
      this.activate();
    } else {
      this.activateByPin();
    }
  }
}
