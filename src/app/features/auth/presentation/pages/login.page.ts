import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type UserType = 'academic' | 'staff' | 'organization' | null;
export type LoginStep = 1 | 2;

export interface UserTypeOption {
  id: UserType;
  label: string;
  sublabel: string;
  description: string;
  icon: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  ssoUrl: string;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  readonly step = signal<LoginStep>(1);
  readonly selectedType = signal<UserType>(null);
  readonly universitySearch = signal('');
  readonly selectedUniversity = signal<University | null>(null);

  readonly userTypeOptions: UserTypeOption[] = [
    {
      id: 'academic',
      label: 'Studente o Dottorando',
      sublabel: 'Accesso gratuito',
      description: 'Accedi con le credenziali del tuo ateneo tramite SSO',
      icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    },
    {
      id: 'staff',
      label: 'Docente o Staff tecnico',
      sublabel: 'Accesso gratuito',
      description: 'Accedi con le credenziali istituzionali del tuo ateneo',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    {
      id: 'organization',
      label: 'Azienda o Collettivo',
      sublabel: 'Piano a pagamento',
      description: 'Accedi con le tue credenziali OhMyUniversity',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ];

  // Lista mock di atenei - verrà sostituita da chiamata API
  readonly universities: University[] = [
    { id: 'unimol', name: 'Università degli Studi del Molise', shortName: 'UniMol', ssoUrl: '#' },
    { id: 'unibo', name: 'Università di Bologna', shortName: 'UniBo', ssoUrl: '#' },
    { id: 'polimi', name: 'Politecnico di Milano', shortName: 'PoliMi', ssoUrl: '#' },
    { id: 'sapienza', name: 'Sapienza Università di Roma', shortName: 'Sapienza', ssoUrl: '#' },
    {
      id: 'unina',
      name: 'Università degli Studi di Napoli Federico II',
      shortName: 'UniNa',
      ssoUrl: '#',
    },
    { id: 'unimi', name: 'Università degli Studi di Milano', shortName: 'UniMi', ssoUrl: '#' },
    { id: 'unipd', name: 'Università degli Studi di Padova', shortName: 'UniPd', ssoUrl: '#' },
    { id: 'unifi', name: 'Università degli Studi di Firenze', shortName: 'UniFi', ssoUrl: '#' },
    { id: 'unito', name: 'Università degli Studi di Torino', shortName: 'UniTo', ssoUrl: '#' },
    { id: 'unipi', name: 'Università di Pisa', shortName: 'UniPi', ssoUrl: '#' },
  ];

  readonly filteredUniversities = computed(() => {
    const q = this.universitySearch().toLowerCase().trim();
    if (!q) return this.universities;
    return this.universities.filter(
      u => u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q),
    );
  });

  readonly isAcademicFlow = computed(
    () => this.selectedType() === 'academic' || this.selectedType() === 'staff',
  );

  selectType(type: UserType): void {
    this.selectedType.set(type);
  }

  goToStep2(): void {
    if (!this.selectedType()) return;
    this.step.set(2);
  }

  goBack(): void {
    this.step.set(1);
    this.selectedUniversity.set(null);
    this.universitySearch.set('');
  }

  selectUniversity(university: University): void {
    this.selectedUniversity.set(university);
  }

  onSearchInput(value: string): void {
    this.universitySearch.set(value);
    this.selectedUniversity.set(null);
  }

  proceedWithSSO(): void {
    const uni = this.selectedUniversity();
    if (!uni) return;
    // TODO: redirect a SSO reale - per ora placeholder
    console.log(`SSO redirect → ${uni.ssoUrl}`);
  }
}
