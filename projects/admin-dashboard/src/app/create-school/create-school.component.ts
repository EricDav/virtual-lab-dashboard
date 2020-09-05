import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from '../_services/school.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css']
})
export class CreateSchoolComponent implements OnInit {
  schoolForm: FormGroup;
  isError = false;
  showSuccess = false;
  errorMessage = {name: '', address: '', email: '', city: '', phoneNumber: ''};

  constructor(
    private formBuilder: FormBuilder,
    private schoolService: SchoolService,
  ) { }

  ngOnInit(): void {
    this.schoolForm = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      country: ['Nigeria', Validators.required]
    });
  }

  get f() { return this.schoolForm.controls; }

  onSubmit() {
    this.errorMessage = {name: '', address: '', email: '', city: '', phoneNumber: ''};
    this.validateInputs();
    if (!this.isError) {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5ODg5ODc1M30.RAw7GgI5dVEID6Px6UUo5V3_dgh26tfNz3ndpzfN18g';
      const schoolData = {
        name: this.f.name.value,
        email: this.f.email.value,
        address: this.f.address.value,
        city: this.f.city.value,
        phone_number: this.f.phoneNumber.value,
        country: this.f.country.value,
        token: token
      }
      this.schoolService.create(schoolData)
      .pipe(first())
      .subscribe(
          data =>  {
            if (data.success) {
              this.showSuccess = true;
            } else {
              this.displayServerError(data.message);
            }
            console.log(data);
          },
          error => {
            console.log(error);
            let errorMessage = error.error.message;
            this.displayServerError(errorMessage);
          });
    } else {

    }
  }

  displayServerError(errorMessage) {
    if (errorMessage.hasOwnProperty('name')) {
      this.errorMessage.name = errorMessage.name;
    }

    if (errorMessage.hasOwnProperty('city')) {
      this.errorMessage.city = errorMessage.city;
    }

    if (errorMessage.hasOwnProperty('email')) { 
      this.errorMessage.email = errorMessage.email;
    }

    if (errorMessage.hasOwnProperty('phone_number')) {
      this.errorMessage.phoneNumber = errorMessage.phone_number;
    }

    if (errorMessage.hasOwnProperty('address')) {
      this.errorMessage.phoneNumber = errorMessage.address;
    }
  }

  validateInputs() {
    if (!this.f.name.value.trim()) {
      this.errorMessage.name = 'Name is required';
    }

    if (!this.f.city.value.trim()) {
      this.errorMessage.city = 'City is required';
    }

    if (!this.f.email.value.trim()) {
      this.errorMessage.email = 'Email is required';
    }

    if (!this.f.address.value.trim()) {
      this.errorMessage.address = 'Address is required';
    }

    if (!this.f.phoneNumber.value.trim()) {
      this.errorMessage.phoneNumber = 'Phone number is required';
    } else if (isNaN(this.f.phoneNumber.value.trim())) {
      this.errorMessage.phoneNumber = 'Invalid phone number';
    }

    if (this.errorMessage.name || this.errorMessage.city || this.errorMessage.email || this.errorMessage.phoneNumber || this.errorMessage.address) {
      this.isError = true;
    } else {
      this.isError = false;
    }
  }

}
