import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transactions = [];
  pinsCount = 0;
  activatedCount = 0;
  balance = '0';
  token = '';
  isEmpty = false;
  isLoading = true;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getDetails();
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

  getDetails() {
    var f = this;
    this.isLoading = true;
    this.userService.getDetails(this.token)
    .pipe(first())
    .subscribe(
        data =>  {
          this.isLoading = false;
          console.log(data);
          if (data.success) {
            this.transactions = data.data.transactions;
            this.pinsCount = data.data.pin_count.count;
            this.activatedCount = data.data.activation_count.count;
            let formatedNum = Number.parseInt(data.data.balance.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            this.balance = formatedNum;
          }
          const transactions = [];
          this.transactions.forEach(function(item, index) {
            item.balance = Number.parseInt(item.balance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            item.pos = index + 1;
            var dateStr = item.date_created  + ' UTC';
            var fixtureDate = f.formatDateCreated(new Date(dateStr.replace(/-/g, '/')));
            item.date_created = fixtureDate;
            item.credit = item.transaction_type == '1' ? Number.parseInt(item.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '';
            item.debit = item.transaction_type == '1' ?  '' : '-' + Number.parseInt(item.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

            transactions.push(item);
          });
          this.transactions = transactions;
          if (this.transactions.length == 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        },
        error => {
          this.isLoading = false;
          console.log(error);
        });
  }

  getClass(transaction) {
    if (transaction.pos%2 == 0)
      return '';
    return 'active';
  }

}
