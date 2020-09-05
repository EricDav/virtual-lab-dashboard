import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  teachers = [];
  isError = false;
  showSuccess = false;
  errorMessage = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  constructor(
    private userService: UserService,
    private closeAddTeacherModal: ElementRef
  ) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getClass(teacher) {
    if (teacher.pos%2 == 0)
      return '';
    return 'active';
  }

  validateInputs() {
    if (!this.firstName.trim()) {
      this.errorMessage.firstName = 'First name is required';
    }

    if (!this.lastName.trim()) {
      this.errorMessage.lastName = 'Last name is required';
    }

    if (!this.email.trim()) {
      this.errorMessage.email = 'Email is required';
    }

    if (!this.password.trim()) {
      this.errorMessage.password = 'Password is required';
    }



    if (this.errorMessage.firstName || this.errorMessage.lastName || this.errorMessage.email || this.errorMessage.password) {
      this.isError = true;
    } else {
      this.isError = false;
    }
  }
  displayServerError(errorMessage) {
    if (errorMessage.hasOwnProperty('name')) {
      this.errorMessage.firstName = errorMessage.name;
    }

    if (errorMessage.hasOwnProperty('password')) {
      this.errorMessage.password = errorMessage.password;
    }

    if (errorMessage.hasOwnProperty('email')) { 
      this.errorMessage.email = errorMessage.email;
    }
  }

  onEmailChange(event) {
    this.email = event.target.value.toString();
  }

  onPasswordChange(event) {
    this.password = event.target.value.toString();
  }

  onFirstNameChange(event) {
    this.firstName = event.target.value;
  }

  onLastNameChange(event) {
    this.lastName = event.target.value;
  }

  getTeachers() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5OTI0MjkxNn0.KTP92kc3hcE6PzM3GatLthMZCHFb_oy_oIbEChR9sP4';
    this.userService.get(token, 2)
    .pipe(first())
    .subscribe(
        data =>  {
          console.log(data);
          const teachers = [];
          if (data.success) {
            data.data.forEach(function(item, index) {
              item.pos = index + 1;
              teachers.push(item);
            });
            this.teachers = teachers;
          } else {
          }
        },
        error => {
          console.log(error);
        });
  }

  save() {
    this.resetState();
    this.validateInputs();
    if (!this.isError) {
      const data = {
        pos: this.teachers.length + 1,
        role: 2,
        name: this.firstName + ' ' + this.lastName,
        email: this.email,
        password: this.password
      }
      this.userService.create(data)
      .pipe(first())
      .subscribe(
        result =>  {
          if (result.success) {
           this.showSuccess = true;
           this.teachers.push(data);
           console.log(this.teachers);
           setTimeout(function() {
             document.getElementById('closeModal').click();
             this.showSuccess = false;
              this.resetState();
           }, 2000)
          } else {
            this.displayServerError(result.message);
          }
        },
        error => {
          console.log(error);
        });
    }
  }

  resetState() {
    this.errorMessage = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

}
