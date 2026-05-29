import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ORG_TYPES } from '@constants';
@Component({
  selector: 'app-contatti-form-organization',
  imports: [FormsModule],
  templateUrl: './contatti-form-organization.component.html',
})
export class ContattiFormOrganization {
  readonly orgForm = {
    orgName: '',
    orgType: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
  };

  readonly orgTypes = ORG_TYPES;

  submitOrg(): void {
    console.log('Org form submitted', this.orgForm);
  }
}
