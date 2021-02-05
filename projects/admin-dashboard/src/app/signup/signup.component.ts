import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  loading = false;
  isError = false;
  buttonText = 'Submit Now';
  errorMessage = {firstName: '', lastName: '', email: '', password: ''};

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = {firstName: '', lastName: '', email: '', password: ''};
    this.validate();
    if (this.isError) {
      return;
    }

    this.loading = true;
    this.buttonText = 'Submitting...';

    let name = this.f.firstName.value + ' ' + this.f.lastName.value;
    const data = {
      name: name,
      email: this.f.email.value,
      password: this.f.password.value
    }
    this.userService.signup(data)
    .pipe(first())
    .subscribe(
        data =>  {
          if (data.success) {
            if (!data.is_verified) {
              this.router.navigate(['/verify']);
              return;
            }
            
            this.router.navigate(['/dashboard']);
            return;
          }
          this.loading = false;
          this.buttonText = 'Submit Now';
          let errorMessage = data.message;

          if (errorMessage.hasOwnProperty('firstName')) {
            this.errorMessage.firstName = 'First' + errorMessage.firstName;
          }

          if (errorMessage.hasOwnProperty('lastName')) {
            this.errorMessage.lastName = 'Last' + errorMessage.lastName;
          }

          if (errorMessage.hasOwnProperty('email')) { 
            this.errorMessage.email = errorMessage.email;
          }

          if (errorMessage.hasOwnProperty('password')) {
            this.errorMessage.password= errorMessage.password;
          }

          this.loading = false;
        },
        error => {
          console.log(error);
            this.loading = false;
            this.buttonText = 'Submit Now';
            let errorMessage = error.error.message;

            if (errorMessage.hasOwnProperty('firstName')) {
              this.errorMessage.firstName = 'First' + errorMessage.firstName;
            }

            if (errorMessage.hasOwnProperty('lastName')) {
              this.errorMessage.lastName = 'Last' + errorMessage.lastName;
            }

            if (errorMessage.hasOwnProperty('email')) { 
              this.errorMessage.email = errorMessage.email;
            }

            if (errorMessage.hasOwnProperty('password')) {
              this.errorMessage.password= errorMessage.password;
            }

            this.loading = false;
        });
  }

  validate() {
    if (!this.f.firstName.value.trim()) {
      this.errorMessage.firstName = 'First name is required';
    }

    if (!this.f.lastName.value.trim()) {
      this.errorMessage.lastName = 'Last name is required';
    }

    if (!this.f.email.value.trim()) {
      this.errorMessage.email = 'Email is required';
    }

    if (!this.f.password.value.trim()) {
      this.errorMessage.password = 'Password is required';
    }

    if (this.errorMessage.firstName || this.errorMessage.lastName || this.errorMessage.email || this.errorMessage.password) {
      this.isError = true;
    } else {
      this.isError = false;
    }
  }

  get f() { return this.signupForm.controls; }
}
