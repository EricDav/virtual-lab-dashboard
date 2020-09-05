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
  constructor(
    private transactionService:  TransactionService
  ) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    let transactions = []
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5OTI0MjkxNn0.KTP92kc3hcE6PzM3GatLthMZCHFb_oy_oIbEChR9sP4';
    this.transactionService.get(token)
    .pipe(first())
    .subscribe(
        data =>  {
          data.data.forEach(function(item, index) {
            item.pos = index + 1;
            item.credit = item.transaction_type ? item.amount : '';
            item.debit = item.transaction_type ?  '' : '-' + item.amount;

            transactions.push(item);
          });
          this.transactions = transactions;
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
