import { Component, OnInit } from '@angular/core';
import { PinService } from '../_services/pin.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-generate-pin',
  templateUrl: './generate-pin.component.html',
  styleUrls: ['./generate-pin.component.css']
})
export class GeneratePinComponent implements OnInit {
    amount = 0;
    qty = 0;
    showSuccess = false;
    token = '';
    errorMessage = '';
    constructor(
      private pinService: PinService,
    ) { }

    ngOnInit(): void {
      this.token = localStorage.getItem('currentUser');
    }

    onKeyQty(event: any) {
      this.qty = event.target.value;
    }

    onKeyAmt(event: any) {
      this.amount = event.target.value.toString();
    }

    onClick() {
      this.errorMessage = '';
      if (!this.qty) {
        this.errorMessage = 'Quantity is required and should be greater than 0'
      }

      if (this.amount < 500) {
        this.errorMessage = 'Amount is required and should be more than 500';
      }

      if (this.errorMessage) {
        return;
      }
      const data = {
        token: this.token,
        num_pins: this.qty,
        amount: this.amount
      }
      this.pinService.create(data) 
      .pipe(first())
      .subscribe(
          data =>  {
             if (data.success) {
              this.showSuccess = true;
             } else {
               this.showSuccess = false;
             }
          },
          error => {
            console.log(error);
          });
    }

}
