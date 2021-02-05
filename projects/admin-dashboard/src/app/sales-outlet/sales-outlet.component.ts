import { Component, OnInit } from '@angular/core';
import { CountriesStates } from '../_services/contries-states.service';

@Component({
  selector: 'app-sales-outlet',
  templateUrl: './sales-outlet.component.html',
  styleUrls: ['./sales-outlet.component.css']
})
export class SalesOutletComponent implements OnInit {
  errorMessage = '';
  isLoading = false;
  btnText = 'Submit';
  showSuccess = false;
  countries = [];
  states = [];
  currentCountry = '';

  constructor(
    private countryStates: CountriesStates,
  ) {
    this.countries = this.countryStates.getCountries();
   }

  ngOnInit(): void {
  }

  onClick() {

  }

  getStates(event) {
    this.currentCountry = event.target.value;
    this.states = this.countryStates.getStates(this.currentCountry)
  }

}
