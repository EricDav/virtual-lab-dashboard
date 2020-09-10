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
  selectedClassroom = {id: ''};
  token = '';
  teachers = [];
  selectedTeacherId = '';
  assignTeacherErrorMessage = '';
  showAssignTeacherSuccess = false;
  isEmpty = true;
  constructor(
    private schoolService: SchoolService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
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
      this.schoolService.addClassroom({token: this.token, name: this.name, school_id: this.id})
      .pipe(first())
      .subscribe(
        result =>  {
          if (result.success) {
            const data = {
              pos: this.schoolData.classrooms.length + 1,
              teacher: 'Unassigned',
              name: this.name,
              num_students: 0
            };
            this.showSuccess = true;
            this.schoolData.classrooms.push(data);
            setTimeout(function() {
              document.getElementById('closeModal').click();
              this.showSuccess = false;
               this.resetState();
            }, 2000)
           } else {
             //this.displayServerError(result.message);
           }
        },
        error => {
          console.log(error);
        });
    }

  }

  getClass(classroom) {
    if (classroom.pos%2 == 0)
      return '';
    return 'active';
  }

  getClassrooms() {
    let classrooms = [];
    this.schoolService.getClassrooms(this.token, this.id)
    .pipe(first())
    .subscribe(
        data =>  {
          this.schoolData = data.data;
          data.data.classrooms.forEach(function(item, index) {
            item.pos = index + 1;
            item.teacher = item.teacher ? item.teacher : 'Unassigned';
            classrooms.push(item);
          });
          this.schoolData.classrooms = classrooms;

          if (this.schoolData.classrooms.length == 0) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        },
        error => {
          console.log(error);
        });
  }

  assignTeacher(classroom) {
    this.selectedClassroom = classroom;
    document.getElementById('openAssignTeacherModal').click();
    this.getTeachers();
  }

  onChange(event: any) {
    this.selectedTeacherId = event.target.value;
  }

  getTeacherName(teacherId) {
    let teacherName;
    this.teachers.forEach(function(item, index){
      if (item.teacher_id == teacherId) {
        teacherName = item.name;
      }
    });

    return teacherName;
  }

  saveTeacher() {
    if (this.selectedTeacherId == '0') {
      return;
    }
    const data = {
      token: this.token,
      classroom_id: this.selectedClassroom.id,
      teacher_id: this.selectedTeacherId
    };
    this.schoolService.assignTeacher(data)
    .pipe(first())
    .subscribe(
        data =>  {
          if (data.success) {
            this.showAssignTeacherSuccess = true;
            var thisComponent = this;
            this.schoolData.classrooms.forEach(function(item, index) {
              if (item.id == thisComponent.selectedClassroom.id) {
                item.teacher = thisComponent.getTeacherName(thisComponent.selectedTeacherId);
              }
            });

            setTimeout(function() {
              document.getElementById('closeAssignTeacherModal').click();

              // Reset modal state
              this.selectedClassroom = {id: ''};
              this.selectedTeacherId = '';
              this.assignTeacherErrorMessage = '';
              this.showAssignTeacherSuccess = false;
            }, 2000);
          } else {
            this.assignTeacherErrorMessage = data.message;
          }
        },
        error => {
          console.log(error);
        }); 
  }

  getTeachers() {
    let teachers = [];
    this.schoolService.getTeachers(this.token)
    .pipe(first())
    .subscribe(
        data =>  {
          console.log(data);
          if (data.success) {
            this.teachers = data.data;
          }
        },
        error => {
          console.log(error);
        }); 
  }

}
