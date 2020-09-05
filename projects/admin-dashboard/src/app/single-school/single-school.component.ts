import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../_services/school.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-school',
  templateUrl: './single-school.component.html',
  styleUrls: ['./single-school.component.css']
})
export class SingleSchoolComponent implements OnInit {

  schoolData = {
    classrooms: [],
    email: '',
    name: '',
    country: '',
    city: '',
    address: '',
  };
  showSuccess = false;
  id = '';
  errorMessage = '';
  name = '';
  constructor(
    private schoolService: SchoolService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = '';
    this.router.params.forEach(function(item) {
      id = item.id
    });
    console.log(id);
    this.id = id;
    this.getClassrooms();
  }

  onNameChange(event) {
    this.name = event.target.value;
  }

  addClassroom() {
    if (!this.name.trim()) {
      this.errorMessage = 'Classroom name is required';
    } else {
      
    }

  }

  getClass(classroom) {
    if (classroom.pos%2 == 0)
      return '';
    return 'active';
  }

  getClassrooms() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhdmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJEYXZpZCBBbGllbnlpIiwiaWQiOjUsImV4cCI6MTU5OTY3NTkxNn0.7a11QOHjFCxfyYcbsPgjc4OUwuopWw5Ulw5uqbxyrzk';
    
    let classrooms = [];
    this.schoolService.getClassrooms(token, this.id)
    .pipe(first())
    .subscribe(
        data =>  {
          this.schoolData = data.data;
          console.log(data);

          data.data.classrooms.forEach(function(item, index) {
            item.pos = index + 1;
            item.teacher = item.teacher ? item.teacher : 'Unassigned';
            classrooms.push(item);
          });
          this.schoolData.classrooms = classrooms;
        },
        error => {
          console.log(error);
        });
  }

}
