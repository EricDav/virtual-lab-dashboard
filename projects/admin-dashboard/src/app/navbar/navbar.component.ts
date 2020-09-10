import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  }
  firstName = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firstName = JSON.parse(localStorage.getItem('user')).name.split(' ')[0];
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }
}
