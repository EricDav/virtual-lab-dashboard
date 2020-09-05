import { Component, OnInit } from '@angular/core';
import { ActivationService } from '../_services/activation.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-activation-keys',
  templateUrl: './activation-keys.component.html',
  styleUrls: ['./activation-keys.component.css']
})
export class ActivationKeysComponent implements OnInit {
  activations = [];

  constructor(
    private activationService: ActivationService,
  ) { }

  ngOnInit(): void {
    this.getActivations();
  }

  getActivations() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5ODcxMjMyN30.dGQd2L-acPpL0x5aMGzx4k5q8nUi7z6leNDfWllF00U';
    this.activationService.get(token)
    .pipe(first())
    .subscribe(
        data =>  {
          let activations = [];
          data.data.forEach(function(item, index) {
            item.pos = index + 1;
            activations.push(item);
          });
          this.activations = activations;
        },
        error => {
          
        });
  }
  getClass(activation) {
    if (activation.pos%2 == 0)
      return '';
    return 'active';
  }

}
