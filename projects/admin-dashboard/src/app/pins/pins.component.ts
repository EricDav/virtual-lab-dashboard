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
  token = '';
  currentPin = '';
  pinHistory = [];
  isEmpty = false;
  constructor(private pinService: PinService,)
   { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getPins();
  }

  formatDateCreated(date) {
    var now = new Date();
    var monthsArr = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth();
    var nowDay = now.getDate();

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (nowYear == year && nowMonth == month && nowDay == day) {
        return 'Today at ' + this.format(date.getHours()) + ':' + this.format(date.getMinutes());
    }

    if (nowYear == year && nowMonth == month && nowDay - 1 == day) {
        return 'Yesterday at ' + this.format(date.getHours()) + ':' + this.format(date.getMinutes());
    }

    if (nowYear == year && nowMonth == month && nowDay + 1 == day) {
        return 'Tomorrow at ' + this.format(date.getHours()) + ':' + this.format(date.getMinutes());
    }

    if (year == nowYear) {
        return day.toString() + ' ' + monthsArr[month] + ' at ' + this.format(hours) + ':' + this.format(minutes);
    }

    return day.toString() + ' ' + monthsArr[month] + ' ' + year.toString() + ' at ' + this.format(hours) + ':' + this.format(minutes);
}
  format(d) {
    d = d.toString();
    return d.length == 2 ? d : '0' + d;
  }

  getClass(pin) {
    if (pin.pos%2 == 0)
      return '';
    return 'active';
  }

  showHistory(pin) {
    this.pinService.getHistory(pin.id)
    .pipe(first())
    .subscribe(
        data =>  {
          console.log(data);
          if (data.success) {
            this.pinHistory = data.data;
          }
        },
        error => {
          console.log(error);
        });
    this.currentPin = pin.pin;
    document.getElementById('openModal').click();
  }

  getLocalFormatedDate(dateStrInUTC) {
    const dateStr = dateStrInUTC  + ' UTC';
    const fDate = this.formatDateCreated(new Date(dateStr.replace(/-/g, '/')));
    return fDate;
  }

  getPins() {
    let pins = [];
    this.pinService.get(this.token)
    .pipe(first())
    .subscribe(
        data =>  {
          console.log(data);
          var f = this;
          data.data.forEach(function(item, index) {
            var dateStr = item.date_created  + ' UTC';
            var fixtureDate = f.formatDateCreated(new Date(dateStr.replace(/-/g, '/')));
            item.pos = index + 1;
            item.date_created = fixtureDate;
            pins.push(item);
          });
          this.pins = pins;
          if (this.pins.length == 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        },
        error => {
          console.log(error);
        });
  }

}
