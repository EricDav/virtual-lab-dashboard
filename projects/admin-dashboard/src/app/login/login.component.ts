import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  isSubmit = false;
  submitClass = 'cur-w';
  errorMessage = '';
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log('Here');
    const data = {
      email: this.email,
      password: this.password
    }
    this.userService.login(data)
    .pipe(first())
    .subscribe(
      result =>  {
        console.log(result);
        if (result.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = result.message;
        }
      },
      error => {
        console.log(error);
      });
  }

  onEmailChange(event) {
    this.email = event.target.value;
    if (this.email.trim() && this.password.trim()) {
      this.isSubmit = true;
      this.submitClass = 'cur';
    }
  }

  onPasswordChange(event) {
    this.password = event.target.value;
    if (this.email.trim() && this.password.trim()) {
      this.isSubmit = true;
      this.submitClass = 'cur';
    }
  }

}
