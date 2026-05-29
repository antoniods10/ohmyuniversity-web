import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ACADEMIC_ROLES, ACADEMIC_SUBJECTS } from '@constants';

@Component({
  selector: 'app-contatti-form-academic',
  imports: [FormsModule],
  templateUrl: './contatti-form-academic.component.html',
})
export class ContattiFormAcademic {
  readonly academicForm = {
    name: '',
    email: '',
    ateneo: '',
    role: '',
    subject: '',
    message: '',
  };

  readonly academicRoles = ACADEMIC_ROLES;
  readonly academicSubjects = ACADEMIC_SUBJECTS;

  submitAcademic(): void {
    console.log('Academic form submitted', this.academicForm);
  }
}
