import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  scrHeight = '300px';
  scrWidth:any;

  constructor() { }

  ngOnInit(): void {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
      this.scrHeight = window.innerHeight.toString() + 'px';
      this.scrWidth = window.innerWidth;
  }

}
