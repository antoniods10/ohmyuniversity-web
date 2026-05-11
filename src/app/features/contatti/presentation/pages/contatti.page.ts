import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type ContactTab = 'academic' | 'organization';

@Component({
  selector: 'app-contatti-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contatti.page.html',
})
export class ContattiPage {
  readonly activeTab = signal<ContactTab>('academic');

  // Form universitari
  readonly academicForm = {
    name: '',
    email: '',
    ateneo: '',
    role: '',
    subject: '',
    message: '',
  };

  // Form organizzazioni
  readonly orgForm = {
    orgName: '',
    orgType: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
  };

  readonly academicRoles = [
    'Studente',
    'Dottorando',
    'Docente',
    'Ricercatore',
    'Staff tecnico-amministrativo',
    'Rettore / Direzione ateneo',
  ];

  readonly orgTypes = [
    'Azienda privata',
    'Startup',
    'Ente pubblico',
    'Collettivo studentesco',
    'Associazione no-profit',
    'Altro',
  ];

  readonly academicSubjects = [
    'Problema tecnico / Bug',
    'Il mio ateneo non è supportato',
    'Richiesta di integrazione per il mio ateneo',
    'Domanda sul funzionamento',
    'Feedback sul prodotto',
    'Altro',
  ];

  setTab(tab: ContactTab): void {
    this.activeTab.set(tab);
  }

  submitAcademic(): void {
    // TODO: integrazione API
    console.log('Academic form submitted', this.academicForm);
  }

  submitOrg(): void {
    // TODO: integrazione API
    console.log('Org form submitted', this.orgForm);
  }
}
