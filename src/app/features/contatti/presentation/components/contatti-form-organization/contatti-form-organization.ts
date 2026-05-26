import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contatti-form-organization',
  imports: [FormsModule],
  templateUrl: './contatti-form-organization.html',
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

  readonly orgTypes = [
    'Azienda privata',
    'Startup',
    'Ente pubblico',
    'Collettivo studentesco',
    'Associazione no-profit',
    'Altro',
  ];

  submitOrg(): void {
    console.log('Org form submitted', this.orgForm);
  }
}
