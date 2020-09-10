import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../_services/transactions.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions = [];
  token = '';
  isEmpty = false;
  constructor(
    private transactionService:  TransactionService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getTransactions();
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

  getTransactions() {
    let transactions = [];
    var f = this;
    this.transactionService.get(this.token)
    .pipe(first())
    .subscribe(
        data =>  {
          data.data.forEach(function(item, index) {
            item.pos = index + 1;
            item.credit = item.transaction_type ? item.amount : '';
            item.debit = item.transaction_type ?  '' : '-' + item.amount;
            var dateStr = item.date_created  + ' UTC';
            var fixtureDate = f.formatDateCreated(new Date(dateStr.replace(/-/g, '/')));
            item.date_created = fixtureDate;
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
          console.log(error);
        });
  }

  getClass(transaction) {
    if (transaction.pos%2 == 0)
      return '';
    return 'active';
  }

}
