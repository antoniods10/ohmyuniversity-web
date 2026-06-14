import { Component, signal, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PageHeaderComponent } from '@ui/page-header/page-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import { inject } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideWallet,
  LucideFileText,
  LucideMegaphone,
  LucideCreditCard,
  LucideExternalLink,
  LucideDownload,
  LucideCalendarDays,
  LucideCircleCheck,
  LucideCircleAlert,
  LucideClock,
  LucideInfo,
  LucideEuro,
  LucideChevronRight,
} from '@lucide/angular';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';

export type ScholarshipStatus = 'open' | 'closing' | 'closed' | 'awarded' | 'not-awarded';
export type FeeStatus = 'paid' | 'pending' | 'overdue';
export type BandoStatus = 'open' | 'closing' | 'closed';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  status: ScholarshipStatus;
  description: string;
  requirements: string[];
  url: string;
}

export interface FormModule {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  updatedAt: string;
}

export interface Bando {
  id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  status: BandoStatus;
  amount?: string;
  url: string;
  publishedAt: string;
}

export interface Fee {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  paidAt?: string;
  status: FeeStatus;
  payUrl?: string;
  receipt?: string;
}

@Component({
  selector: 'app-secretariat',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PageHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomTextComponent,
    CustomTabsComponent,
    CustomInputComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './secretariat.page.html',
})
export class SecretariatPage {
  private toast = inject(ToastService);

  readonly iconSearch = LucideSearch;
  readonly iconWallet = LucideWallet;
  readonly iconFile = LucideFileText;
  readonly iconMegaphone = LucideMegaphone;
  readonly iconCreditCard = LucideCreditCard;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconDownload = LucideDownload;
  readonly iconCalendar = LucideCalendarDays;
  readonly iconCheck = LucideCircleCheck;
  readonly iconAlert = LucideCircleAlert;
  readonly iconClock = LucideClock;
  readonly iconInfo = LucideInfo;
  readonly iconEuro = LucideEuro;
  readonly iconChevron = LucideChevronRight;

  activeTab = signal<string>('scholarships');
  searchValue = signal<string>('');

  readonly tabs: TabItem[] = [
    { id: 'scholarships', label: 'Borse di studio', icon: LucideWallet },
    { id: 'forms', label: 'Modulistica', icon: LucideFileText },
    { id: 'bandi', label: 'Bandi e concorsi', icon: LucideMegaphone },
    { id: 'fees', label: 'Tasse', icon: LucideCreditCard },
  ];

  // @TODO
  readonly scholarships: Scholarship[] = [
    {
      id: 'b1',
      name: 'Borsa di Studio DSU Molise 2024/2025',
      provider: 'DSU Molise',
      amount: 'Fino a €5.500 + alloggio',
      deadline: '30 settembre 2025',
      status: 'open',
      description:
        'Borsa per il diritto allo studio destinata agli studenti con ISEE inferiore a €24.335. Comprende contributo monetario e accesso alla mensa universitaria.',
      requirements: [
        'ISEE ≤ €24.335',
        'Iscritto a corso di laurea triennale o magistrale',
        'Requisiti di merito previsti dal bando',
      ],
      url: 'https://www.dsumolise.it/borse',
    },
    {
      id: 'b2',
      name: 'Borsa Erasmus+ Studio 2024/2025',
      provider: 'Università del Molise',
      amount: '€350–€500 / mese',
      deadline: '15 marzo 2025',
      status: 'closed',
      description:
        "Contributo mensile per studenti selezionati per la mobilità Erasmus+ in Europa. L'importo varia in base al paese di destinazione.",
      requirements: [
        'Media voti ≥ 24/30',
        'Minimo 40 CFU acquisiti',
        'Conoscenza della lingua del paese di destinazione',
      ],
      url: 'https://www.unimol.it/erasmus/borse',
    },
    {
      id: 'b3',
      name: 'Premio di Laurea "Eccellenza Molise"',
      provider: 'Università del Molise',
      amount: '€2.000',
      deadline: '31 luglio 2025',
      status: 'open',
      description:
        "Premio una tantum per i migliori laureati dell'anno accademico in corso con votazione di 110/110 con lode.",
      requirements: [
        'Laurea con 110/110 con lode',
        'Laureato entro i termini del corso',
        'Residenza in Molise',
      ],
      url: 'https://www.unimol.it/premi-laurea',
    },
    {
      id: 'b4',
      name: "Borsa Tesi all'Estero",
      provider: 'Università del Molise',
      amount: '€1.500 una tantum',
      deadline: '28 febbraio 2025',
      status: 'closed',
      description:
        'Contributo per studenti che svolgono parte della tesi di laurea magistrale presso università o centri di ricerca stranieri.',
      requirements: [
        'Iscritto al 2° anno LM',
        'Accordo con istituzione estera',
        'Piano di lavoro approvato',
      ],
      url: 'https://www.unimol.it/borsa-tesi-estero',
    },
    {
      id: 'b5',
      name: 'Contributo Studenti con Disabilità',
      provider: 'DSU Molise',
      amount: 'Variabile in base al grado di disabilità',
      deadline: '31 ottobre 2025',
      status: 'open',
      description:
        'Supporto economico e servizi aggiuntivi per studenti con invalidità certificata. Include ausili, tutoraggio e abbattimento tasse.',
      requirements: ['Invalidità certificata ≥ 66%', 'Iscrizione a corso di laurea attivo'],
      url: 'https://www.dsumolise.it/disabilita',
    },
    {
      id: 'b6',
      name: 'Borsa "150 ore" — Collaborazione Studentesca',
      provider: 'Università del Molise',
      amount: '€9/ora · max €1.350',
      deadline: '20 ottobre 2025',
      status: 'closing',
      description:
        "Collaborazione part-time con l'ateneo per 150 ore presso uffici, biblioteche e laboratori. Aperta a studenti con ISEE ≤ €30.000.",
      requirements: [
        'ISEE ≤ €30.000',
        'Minimo 20 CFU acquisiti',
        'Non ripetente dello stesso anno',
      ],
      url: 'https://www.unimol.it/150ore',
    },
  ];

  readonly formModules: FormModule[] = [
    {
      id: 'm1',
      name: 'Domanda di immatricolazione',
      description:
        "Modulo per l'immatricolazione a corsi di laurea triennale, magistrale e magistrale a ciclo unico.",
      category: 'Iscrizioni',
      url: 'https://esse3.unimol.it/immatricolazione',
      updatedAt: 'Settembre 2024',
    },
    {
      id: 'm2',
      name: 'Piano di studi individuale',
      description:
        'Modulo per la presentazione del piano di studi individuale fuori percorso standard.',
      category: 'Carriera',
      url: 'https://esse3.unimol.it/piano-studi',
      updatedAt: 'Ottobre 2024',
    },
    {
      id: 'm3',
      name: 'Richiesta certificato di laurea',
      description:
        'Modulo per richiedere certificati accademici con e senza timbro e firma del rettore.',
      category: 'Certificati',
      url: 'https://esse3.unimol.it/certificati',
      updatedAt: 'Gennaio 2025',
    },
    {
      id: 'm4',
      name: 'Riconoscimento crediti (trasferimento)',
      description:
        'Modulo da compilare in caso di trasferimento da altro ateneo o cambio corso per il riconoscimento dei CFU acquisiti.',
      category: 'Trasferimenti',
      url: 'https://www.unimol.it/modulistica/riconoscimento-crediti',
      updatedAt: 'Luglio 2024',
    },
    {
      id: 'm5',
      name: 'Domanda di sospensione carriera',
      description:
        'Modulo per richiedere la sospensione temporanea della carriera universitaria per motivi documentati.',
      category: 'Carriera',
      url: 'https://www.unimol.it/modulistica/sospensione',
      updatedAt: 'Marzo 2024',
    },
    {
      id: 'm6',
      name: 'Richiesta esonero tasse',
      description:
        'Modulo per la richiesta di esonero parziale o totale dalle tasse universitarie per condizioni economiche o di merito.',
      category: 'Tasse',
      url: 'https://www.unimol.it/modulistica/esonero-tasse',
      updatedAt: 'Giugno 2024',
    },
    {
      id: 'm7',
      name: 'Domanda di tirocinio curriculare',
      description:
        "Modulo per l'attivazione di tirocini curriculari presso aziende convenzionate con l'ateneo.",
      category: 'Tirocini',
      url: 'https://placement.unimol.it/tirocini',
      updatedAt: 'Settembre 2024',
    },
    {
      id: 'm8',
      name: 'Autocertificazione ISEE',
      description:
        'Modulo di autocertificazione del reddito familiare per la domanda di borsa di studio o esonero tasse.',
      category: 'Economico',
      url: 'https://www.unimol.it/modulistica/isee',
      updatedAt: 'Febbraio 2025',
    },
    {
      id: 'm9',
      name: 'Domanda di laurea',
      description:
        'Procedura online per la presentazione della domanda di laurea e caricamento della tesi.',
      category: 'Laurea',
      url: 'https://esse3.unimol.it/domanda-laurea',
      updatedAt: 'Novembre 2024',
    },
  ];

  readonly bandi: Bando[] = [
    {
      id: 'ba1',
      title: 'Bando Tutor Didattici 2024/2025',
      description:
        'Selezione di studenti senior per attività di tutoraggio a supporto degli studenti del primo anno.',
      category: 'Selezione studenti',
      deadline: '10 novembre 2025',
      status: 'open',
      amount: '€600 una tantum',
      url: 'https://www.unimol.it/bandi/tutor-didattici',
      publishedAt: '1 ottobre 2025',
    },
    {
      id: 'ba2',
      title: 'Concorso Fotografico "Università in scatto"',
      description:
        "Concorso aperto a tutti gli studenti dell'ateneo per la valorizzazione del patrimonio universitario attraverso la fotografia.",
      category: 'Concorsi culturali',
      deadline: '28 febbraio 2025',
      status: 'closed',
      amount: '1° premio €500',
      url: 'https://www.unimol.it/bandi/concorso-foto',
      publishedAt: '15 gennaio 2025',
    },
    {
      id: 'ba3',
      title: 'Bando Rappresentanti degli Studenti',
      description:
        "Elezioni per i rappresentanti degli studenti negli organi collegiali dell'ateneo per il biennio 2025/2027.",
      category: 'Elezioni',
      deadline: '20 novembre 2025',
      status: 'open',
      url: 'https://www.unimol.it/bandi/rappresentanti',
      publishedAt: '5 ottobre 2025',
    },
    {
      id: 'ba4',
      title: 'Selezione Studentessa/Studente Erasmus Ambassador',
      description:
        'Ricerca di studenti con esperienza Erasmus per promuovere la mobilità internazionale nelle scuole superiori del Molise.',
      category: 'Internazionale',
      deadline: '5 novembre 2025',
      status: 'closing',
      url: 'https://www.unimol.it/bandi/erasmus-ambassador',
      publishedAt: '20 settembre 2025',
    },
    {
      id: 'ba5',
      title: 'Premio Tesi di Laurea in Sostenibilità',
      description:
        'Premio per le migliori tesi di laurea magistrale su temi di sostenibilità ambientale, sociale ed economica.',
      category: 'Premi',
      deadline: '31 gennaio 2025',
      status: 'closed',
      amount: '€1.000',
      url: 'https://www.unimol.it/bandi/premio-sostenibilita',
      publishedAt: '1 dicembre 2024',
    },
    {
      id: 'ba6',
      title: 'Bando Collaboratori Biblioteca 2025',
      description:
        "Selezione studenti per collaborazione part-time presso la Biblioteca di Ateneo per attività di catalogazione e supporto all'utenza.",
      category: 'Selezione studenti',
      deadline: '15 dicembre 2025',
      status: 'open',
      amount: '€9/ora · max 80 ore',
      url: 'https://www.unimol.it/bandi/biblioteca',
      publishedAt: '10 novembre 2025',
    },
  ];

  readonly fees: Fee[] = [
    {
      id: 'f1',
      name: 'Prima rata — A.A. 2024/2025',
      amount: 450.0,
      dueDate: '31 ottobre 2024',
      paidAt: '15 ottobre 2024',
      status: 'paid',
      receipt: 'https://esse3.unimol.it/ricevuta/f1',
    },
    {
      id: 'f2',
      name: 'Seconda rata — A.A. 2024/2025',
      amount: 380.0,
      dueDate: '28 febbraio 2025',
      paidAt: '20 febbraio 2025',
      status: 'paid',
      receipt: 'https://esse3.unimol.it/ricevuta/f2',
    },
    {
      id: 'f3',
      name: 'Terza rata — A.A. 2024/2025',
      amount: 380.0,
      dueDate: '30 aprile 2025',
      status: 'overdue',
      payUrl: 'https://esse3.unimol.it/pagamenti',
    },
    {
      id: 'f4',
      name: 'Contributo servizi — A.A. 2024/2025',
      amount: 80.0,
      dueDate: '31 ottobre 2024',
      paidAt: '15 ottobre 2024',
      status: 'paid',
      receipt: 'https://esse3.unimol.it/ricevuta/f4',
    },
    {
      id: 'f5',
      name: 'Prima rata — A.A. 2025/2026',
      amount: 450.0,
      dueDate: '31 ottobre 2025',
      status: 'pending',
      payUrl: 'https://esse3.unimol.it/pagamenti',
    },
  ];

  readonly filteredScholarships = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.scholarships;
    return this.scholarships.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
    );
  });

  readonly filteredForms = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.formModules;
    return this.formModules.filter(
      f =>
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q),
    );
  });

  readonly filteredBandi = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.bandi;
    return this.bandi.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q),
    );
  });

  readonly formCategories = computed(() => {
    const cats = new Set(this.filteredForms().map(f => f.category));
    return Array.from(cats);
  });

  readonly totalPaid = computed(() =>
    this.fees.filter(f => f.status === 'paid').reduce((acc, f) => acc + f.amount, 0),
  );

  readonly totalPending = computed(() =>
    this.fees.filter(f => f.status !== 'paid').reduce((acc, f) => acc + f.amount, 0),
  );

  onTabChange(id: string): void {
    this.activeTab.set(id);
    this.searchValue.set('');
  }

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  onApplyScholarship(s: Scholarship): void {
    if (s.status === 'closed') {
      this.toast.warning('Le domande per questa borsa sono chiuse.', { duration: 4000 });
      return;
    }
    window.open(s.url, '_blank');
  }

  scholarshipStatusLabel(status: ScholarshipStatus): string {
    const map: Record<ScholarshipStatus, string> = {
      open: 'Aperta',
      closing: 'In scadenza',
      closed: 'Chiusa',
      awarded: 'Assegnata',
      'not-awarded': 'Non assegnata',
    };
    return map[status];
  }

  scholarshipStatusVariant(
    status: ScholarshipStatus,
  ): 'success' | 'warning' | 'neutral' | 'primary' | 'error' {
    const map: Record<ScholarshipStatus, 'success' | 'warning' | 'neutral' | 'primary' | 'error'> =
      {
        open: 'success',
        closing: 'warning',
        closed: 'neutral',
        awarded: 'primary',
        'not-awarded': 'error',
      };
    return map[status];
  }

  bandoStatusLabel(status: BandoStatus): string {
    const map: Record<BandoStatus, string> = {
      open: 'Aperto',
      closing: 'In scadenza',
      closed: 'Chiuso',
    };
    return map[status];
  }

  bandoStatusVariant(status: BandoStatus): 'success' | 'warning' | 'neutral' {
    const map: Record<BandoStatus, 'success' | 'warning' | 'neutral'> = {
      open: 'success',
      closing: 'warning',
      closed: 'neutral',
    };
    return map[status];
  }

  feeStatusLabel(status: FeeStatus): string {
    const map: Record<FeeStatus, string> = {
      paid: 'Pagata',
      pending: 'Da pagare',
      overdue: 'Scaduta',
    };
    return map[status];
  }

  feeStatusVariant(status: FeeStatus): 'success' | 'primary' | 'error' {
    const map: Record<FeeStatus, 'success' | 'primary' | 'error'> = {
      paid: 'success',
      pending: 'primary',
      overdue: 'error',
    };
    return map[status];
  }

  formsForCategory(category: string): FormModule[] {
    return this.filteredForms().filter(f => f.category === category);
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  feeIcon(status: FeeStatus): any {
    if (status === 'paid') return this.iconCheck;
    if (status === 'overdue') return this.iconAlert;
    return this.iconClock;
  }

  feeIconColor(status: FeeStatus): string {
    if (status === 'paid') return 'var(--color-success-dark)';
    if (status === 'overdue') return 'var(--color-error-dark)';
    return 'var(--color-primary-dark)';
  }

  feeIconBg(status: FeeStatus): string {
    if (status === 'paid') return 'var(--color-success-light)';
    if (status === 'overdue') return 'var(--color-error-light)';
    return 'var(--color-primary-light)';
  }
}
