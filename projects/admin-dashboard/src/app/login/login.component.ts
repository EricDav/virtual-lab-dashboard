import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  isError = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.isError = false;

    if (!this.f.email.value.trim()) {
      this.isError = true;
      this.errorMessage = '  Email is required';
      return;
    } 

    if (!this.f.password.value.trim()) {
      this.isError = true;
      this.errorMessage = '  Password is required';
      return;
    }

    const data = {
      email: this.f.email.value,
      password: this.f.password.value
    }
    this.isLoading = true;
    this.userService.login(data)
    .pipe(first())
    .subscribe(
        data =>  {
          this.isLoading = false;
          console.log(data);
          if (data.success) {
            if (!data.user.is_verified) {
              localStorage.setItem('verifyEmail', data.user.email);
              this.router.navigate(['/verify']);
              return;
            }
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = data.message;
          }
        },
        error => {
            this.isError = true;
            this.errorMessage = 'Server error';
            this.isLoading = false;
        });
  }

  get f() { return this.loginForm.controls; }
}
