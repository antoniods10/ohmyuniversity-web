import { Component, signal, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PageHeaderComponent } from '@ui/page-header/page-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';
import { CustomAvatarComponent } from '@ui/custom-avatar/custom-avatar.component';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideMail,
  LucidePhone,
  LucideMapPin,
  LucideClock,
  LucideUser,
  LucideBuilding2,
  LucideGraduationCap,
  LucideHeadphones,
  LucideExternalLink,
  LucideBookOpen,
  LucideUsers,
} from '@lucide/angular';

export type ContactCampus = 'all' | 'campobasso' | 'termoli' | 'pesche';

export interface SecretariatContact {
  id: string;
  office: string;
  description: string;
  email: string;
  phone?: string;
  hours?: string;
  campus: ContactCampus;
  website?: string;
}

export interface ProfessorContact {
  id: string;
  name: string;
  role: string;
  department: string;
  courses: string[];
  email: string;
  phone?: string;
  office?: string;
  hours?: string;
  campus: ContactCampus;
  website?: string;
}

export interface InstitutionalContact {
  id: string;
  name: string;
  description: string;
  phone?: string;
  email?: string;
  hours?: string;
  campus: ContactCampus;
}

@Component({
  selector: 'app-university-contacts',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PageHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTextComponent,
    CustomTabsComponent,
    CustomAvatarComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './university-contacts.page.html',
})
export class UniversityContactsPage {
  readonly iconSearch = LucideSearch;
  readonly iconMail = LucideMail;
  readonly iconPhone = LucidePhone;
  readonly iconMapPin = LucideMapPin;
  readonly iconClock = LucideClock;
  readonly iconUser = LucideUser;
  readonly iconBuilding = LucideBuilding2;
  readonly iconGraduation = LucideGraduationCap;
  readonly iconHeadphones = LucideHeadphones;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconBook = LucideBookOpen;
  readonly iconUsers = LucideUsers;

  activeTab = signal<string>('secretariat');
  searchValue = signal<string>('');
  activeCampus = signal<ContactCampus>('all');

  readonly tabs: TabItem[] = [
    { id: 'secretariat', label: 'Segreteria', icon: LucideBuilding2 },
    { id: 'professors', label: 'Docenti', icon: LucideGraduationCap },
    { id: 'institutional', label: 'Numeri utili', icon: LucideHeadphones },
  ];

  readonly campusFilters: { id: ContactCampus; label: string }[] = [
    { id: 'all', label: 'Tutte le sedi' },
    { id: 'campobasso', label: 'Campobasso' },
    { id: 'termoli', label: 'Termoli' },
    { id: 'pesche', label: 'Pesche' },
  ];

  // @TODO
  readonly secretariatContacts: SecretariatContact[] = [
    {
      id: 's1',
      office: 'Segreteria Studenti — Sportello Generale',
      description:
        'Iscrizioni, immatricolazioni, tasse universitarie, piani di studio e certificati.',
      email: 'segreteria.studenti@unimol.it',
      phone: '+39 0874 404100',
      hours: 'Lun–Ven 10:00–13:00 | Mar–Gio 15:00–17:00',
      campus: 'campobasso',
      website: 'https://www.unimol.it/segreteria',
    },
    {
      id: 's2',
      office: 'Ufficio Didattica e Offerta Formativa',
      description:
        "Gestione dell'offerta formativa, riconoscimento crediti, trasferimenti e passaggi di corso.",
      email: 'didattica@unimol.it',
      phone: '+39 0874 404150',
      hours: 'Lun–Ven 10:00–13:00',
      campus: 'campobasso',
    },
    {
      id: 's3',
      office: 'Ufficio Diritto allo Studio',
      description:
        'Borse di studio, esoneri, agevolazioni economiche e collaborazioni studentesche (150 ore).',
      email: 'dirittostudio@unimol.it',
      phone: '+39 0874 404200',
      hours: 'Lun–Ven 10:00–13:00 | Mer 15:00–17:00',
      campus: 'campobasso',
      website: 'https://www.unimol.it/diritto-studio',
    },
    {
      id: 's4',
      office: 'Ufficio Relazioni Internazionali',
      description:
        'Programmi Erasmus+, mobilità internazionale, accordi bilaterali e doppi titoli.',
      email: 'relint@unimol.it',
      phone: '+39 0874 404300',
      hours: 'Lun–Ven 11:00–13:00',
      campus: 'campobasso',
      website: 'https://www.unimol.it/internazionale',
    },
    {
      id: 's5',
      office: 'Ufficio Placement e Tirocini',
      description:
        'Orientamento al lavoro, tirocini curriculari ed extracurriculari, convenzioni aziendali.',
      email: 'placement@unimol.it',
      phone: '+39 0874 404350',
      hours: 'Lun–Ven 10:00–12:00',
      campus: 'campobasso',
    },
    {
      id: 's6',
      office: 'Segreteria Studenti — Sede di Termoli',
      description: 'Punto di riferimento per gli studenti iscritti ai corsi della sede di Termoli.',
      email: 'segreteria.termoli@unimol.it',
      phone: '+39 0875 712100',
      hours: 'Lun–Ven 10:00–13:00',
      campus: 'termoli',
    },
    {
      id: 's7',
      office: 'Ufficio Didattica — Sede di Termoli',
      description:
        'Gestione piani di studio e pratiche didattiche per i corsi della sede di Termoli.',
      email: 'didattica.termoli@unimol.it',
      hours: 'Mar–Gio 10:00–13:00',
      campus: 'termoli',
    },
    {
      id: 's8',
      office: 'Segreteria — Centro Congressi Pesche',
      description: 'Attività didattiche e organizzative legate alla sede distaccata di Pesche.',
      email: 'pesche@unimol.it',
      phone: '+39 0865 921100',
      hours: 'Lun–Ven 09:00–13:00',
      campus: 'pesche',
    },
  ];

  readonly professorContacts: ProfessorContact[] = [
    {
      id: 'p1',
      name: 'Prof. Mario Bianchi',
      role: 'Professore Ordinario',
      department: 'Dipartimento di Bioscienze e Territorio',
      courses: ['Algoritmi e Strutture Dati', 'Teoria della Computazione'],
      email: 'm.bianchi@unimol.it',
      phone: '+39 0874 404401',
      office: 'Edificio A, Stanza 214',
      hours: 'Mer 14:00–16:00',
      campus: 'campobasso',
      website: 'https://docenti.unimol.it/bianchi',
    },
    {
      id: 'p2',
      name: 'Prof.ssa Laura Conti',
      role: 'Professoressa Associata',
      department: 'Dipartimento di Bioscienze e Territorio',
      courses: ['Sistemi Operativi', 'Architetture degli Elaboratori'],
      email: 'l.conti@unimol.it',
      office: 'Edificio B, Stanza 108',
      hours: 'Lun 15:00–17:00',
      campus: 'campobasso',
    },
    {
      id: 'p3',
      name: 'Prof. Giovanni Serra',
      role: 'Professore Associato',
      department: 'Dipartimento di Scienze Economiche, Gestionali e Sociali',
      courses: ['Basi di Dati', 'Sistemi Informativi Aziendali'],
      email: 'g.serra@unimol.it',
      phone: '+39 0874 404425',
      office: 'Edificio A, Stanza 312',
      hours: 'Mar 10:00–12:00',
      campus: 'campobasso',
      website: 'https://docenti.unimol.it/serra',
    },
    {
      id: 'p4',
      name: 'Prof.ssa Carla Russo',
      role: 'Professoressa Ordinaria',
      department: 'Dipartimento di Bioscienze e Territorio',
      courses: ['Analisi Matematica I', 'Analisi Matematica II'],
      email: 'c.russo@unimol.it',
      phone: '+39 0874 404440',
      office: 'Edificio B, Stanza 205',
      hours: 'Gio 09:00–11:00',
      campus: 'campobasso',
    },
    {
      id: 'p5',
      name: 'Prof. Antonio Greco',
      role: 'Ricercatore a Tempo Determinato',
      department: 'Dipartimento di Bioscienze e Territorio',
      courses: ['Reti di Calcolatori', 'Sicurezza Informatica'],
      email: 'a.greco@unimol.it',
      office: 'Edificio B, Stanza 110',
      hours: 'Mer 11:00–13:00',
      campus: 'campobasso',
    },
    {
      id: 'p6',
      name: 'Prof.ssa Federica Longo',
      role: 'Professoressa Associata',
      department: 'Dipartimento di Bioscienze e Territorio',
      courses: ['Ingegneria del Software', 'Progettazione di Sistemi'],
      email: 'f.longo@unimol.it',
      phone: '+39 0874 404460',
      office: 'Edificio A, Stanza 118',
      hours: 'Ven 10:00–12:00',
      campus: 'campobasso',
      website: 'https://docenti.unimol.it/longo',
    },
    {
      id: 'p7',
      name: 'Prof. Roberto Marini',
      role: 'Professore Associato',
      department: 'Dipartimento di Scienze Umanistiche, Sociali e della Formazione',
      courses: ['Fisica Teorica I', 'Fisica Teorica II'],
      email: 'r.marini@unimol.it',
      office: 'Polo Didattico Termoli, Stanza 12',
      hours: 'Mar 14:00–16:00',
      campus: 'termoli',
    },
  ];

  readonly institutionalContacts: InstitutionalContact[] = [
    {
      id: 'i1',
      name: 'Centralino Università del Molise',
      description: "Numero generale dell'ateneo per informazioni e smistamento chiamate.",
      phone: '+39 0874 4041',
      hours: 'Lun–Ven 08:00–19:00',
      campus: 'all',
    },
    {
      id: 'i2',
      name: 'Ufficio Relazioni con il Pubblico (URP)',
      description:
        'Punto di accesso per reclami, segnalazioni e richieste di informazioni istituzionali.',
      phone: '+39 0874 404111',
      email: 'urp@unimol.it',
      hours: 'Lun–Ven 09:00–13:00',
      campus: 'all',
    },
    {
      id: 'i3',
      name: 'Presidio di Sicurezza — Campobasso',
      description: 'Portineria e sicurezza del campus. Attivo anche fuori orario per emergenze.',
      phone: '+39 0874 404500',
      hours: 'H24',
      campus: 'campobasso',
    },
    {
      id: 'i4',
      name: 'CUS Molise — Centro Sportivo',
      description: 'Prenotazioni strutture sportive, iscrizioni corsi e informazioni attività.',
      phone: '+39 0874 698001',
      email: 'cus@unimol.it',
      hours: 'Lun–Ven 09:00–21:00 | Sab 09:00–13:00',
      campus: 'campobasso',
    },
    {
      id: 'i5',
      name: 'Biblioteca di Ateneo',
      description:
        'Prestiti, consultazioni, accesso banche dati e supporto alla ricerca bibliografica.',
      phone: '+39 0874 404600',
      email: 'biblioteca@unimol.it',
      hours: 'Lun–Ven 08:30–19:00 | Sab 08:30–13:00',
      campus: 'campobasso',
    },
    {
      id: 'i6',
      name: 'Servizio Informatico di Ateneo (SIA)',
      description:
        'Supporto tecnico per credenziali, accesso reti Wi-Fi, software istituzionale e problemi IT.',
      email: 'helpdesk@unimol.it',
      phone: '+39 0874 404700',
      hours: 'Lun–Ven 09:00–17:00',
      campus: 'all',
    },
    {
      id: 'i7',
      name: 'Presidio di Sicurezza — Termoli',
      description: 'Portineria della sede di Termoli.',
      phone: '+39 0875 712000',
      hours: 'Lun–Ven 07:30–20:00',
      campus: 'termoli',
    },
    {
      id: 'i8',
      name: 'Mensa Universitaria — Campobasso',
      description: 'Informazioni su orari, menù e prenotazione pasti. Gestita da DSU Molise.',
      phone: '+39 0874 698200',
      hours: 'Lun–Ven 12:00–14:30 | 19:00–20:30',
      campus: 'campobasso',
    },
  ];

  readonly filteredSecretariat = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    const campus = this.activeCampus();
    return this.secretariatContacts.filter(c => {
      const matchCampus = campus === 'all' || c.campus === campus;
      const matchQ =
        !q ||
        c.office.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchCampus && matchQ;
    });
  });

  readonly filteredProfessors = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    const campus = this.activeCampus();
    return this.professorContacts.filter(c => {
      const matchCampus = campus === 'all' || c.campus === campus;
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.courses.some(course => course.toLowerCase().includes(q));
      return matchCampus && matchQ;
    });
  });

  readonly filteredInstitutional = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    const campus = this.activeCampus();
    return this.institutionalContacts.filter(c => {
      const matchCampus = campus === 'all' || c.campus === campus || c.campus === 'all';
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.email?.toLowerCase().includes(q) ?? false);
      return matchCampus && matchQ;
    });
  });

  onTabChange(id: string): void {
    this.activeTab.set(id);
    this.searchValue.set('');
  }

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  setCampus(campus: ContactCampus): void {
    this.activeCampus.set(campus);
  }

  campusLabel(campus: ContactCampus): string {
    const map: Record<ContactCampus, string> = {
      all: 'Tutte le sedi',
      campobasso: 'Campobasso',
      termoli: 'Termoli',
      pesche: 'Pesche',
    };
    return map[campus];
  }

  campusVariant(campus: ContactCampus): 'primary' | 'secondary' | 'success' | 'ghost' {
    const map: Record<ContactCampus, 'primary' | 'secondary' | 'success' | 'ghost'> = {
      all: 'ghost',
      campobasso: 'primary',
      termoli: 'secondary',
      pesche: 'success',
    };
    return map[campus];
  }
}
