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
    constructor(
      private pinService: PinService,
    ) { }

    ngOnInit(): void {
      
    }

    onKeyQty(event: any) {
      this.qty = event.target.value;
    }

    onKeyAmt(event: any) {
      this.amount = event.target.value.toString();
    }

    onClick() {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5ODcxMjMyN30.dGQd2L-acPpL0x5aMGzx4k5q8nUi7z6leNDfWllF00U';
      const data = {
        token: token,
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
