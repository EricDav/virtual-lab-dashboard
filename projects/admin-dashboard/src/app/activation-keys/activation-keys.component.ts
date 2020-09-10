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
  token = '';
  isEmpty = false;

  constructor(
    private activationService: ActivationService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getActivations();
  }

  getActivations() {
    this.activationService.get(this.token)
    .pipe(first())
    .subscribe(
        data =>  {
          let activations = [];
          data.data.forEach(function(item, index) {
            item.pos = index + 1;
            activations.push(item);
          });
          this.activations = activations;
          if (this.activations.length == 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
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
