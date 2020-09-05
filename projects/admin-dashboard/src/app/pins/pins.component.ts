import { Component, OnInit } from '@angular/core';
import { PinService } from '../_services/pin.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {
  pins = [];
  constructor(private pinService: PinService,)
   { }

  ngOnInit(): void {
    this.getPins();
  }

  getClass(pin) {
    if (pin.pos%2 == 0)
      return '';
    return 'active';
  }

  getPins() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5ODAxOTk3M30.JHCoZtAwBZ0qSUI-pdcIL9LRJcfMrmZPaaNiKkBP0UM';
    let pins = []
    this.pinService.get(token)
    .pipe(first())
    .subscribe(
        data =>  {
          console.log(data);
          data.data.forEach(function(item, index) {
            item.pos = index + 1;
            pins.push(item);
          });
          this.pins = pins;
          console.log(this.pins);
        },
        error => {
          console.log(error);
        });
  }

}
