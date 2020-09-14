import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  scrHeight = '300px';
  scrWidth = window.innerWidth;

  constructor() { }

  ngOnInit(): void {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
      if (this.scrWidth > 768) {
        this.scrHeight = window.innerHeight.toString() + 'px';
      } else {
        this.scrHeight = 'fit-content';
      }
      this.scrWidth = window.innerWidth;
  }

}
