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
  errorMessage = '';
  constructor(
    private activationService: ActivationService,
  ) { }

  ngOnInit(): void {
  }

  onKey(event: any) {
    this.productKey = event.target.value;
  }

  onClick() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5ODU5Mjc1NX0.NHf1okDfJj1ECiMSM0SL4H_MRRxDSxRq5BdqwDze750';
    const data = {
      token: token,
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
}
