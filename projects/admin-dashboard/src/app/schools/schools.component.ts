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
  constructor(
    private schoolService: SchoolService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSchools();
  }

  getSchools() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5OTY3NTkxNn0.7a11QOHjFCxfyYcbsPgjc4OUwuopWw5Ulw5uqbxyrzk';
    let schools = []
    this.schoolService.get(token)
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
