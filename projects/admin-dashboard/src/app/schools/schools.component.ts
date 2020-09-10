import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../_services/school.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {

  schools = [];
  token = '';
  constructor(
    private schoolService: SchoolService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getSchools();
  }

  getSchools() {
    let schools = [];
    this.schoolService.get(this.token)
    .pipe(first())
    .subscribe(
        data =>  {
          data.data.forEach(function(item, index) {
            item.pos = index + 1;
            schools.push(item);
          });
          this.schools = schools
        },
        error => {
          console.log(error);
        });
  }

  getClass(school) {
    if (school.pos%2 == 0)
      return '';
    return 'active';
  }

  moveToSingleSchool(school) {
    this.router.navigate(['/schools/' + school.id]);
  }

}
