import { Component, signal, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PageHeaderComponent } from '@ui/page-header/page-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideExternalLink,
  LucideGraduationCap,
  LucideMail,
  LucideBookOpen,
  LucideBriefcase,
  LucideWallet,
  LucideBuilding2,
  LucideUsers,
  LucideShield,
  LucideStar,
} from '@lucide/angular';

export type PortalCategory =
  | 'segreteria'
  | 'didattica'
  | 'email'
  | 'borse'
  | 'carriera'
  | 'collaborazione'
  | 'benessere'
  | 'internazionale';

export interface Portal {
  id: string;
  name: string;
  description: string;
  url: string;
  category: PortalCategory;
  tags: string[];
  featured?: boolean;
}

export interface PortalCategoryDef {
  id: PortalCategory;
  label: string;
  icon: any;
  color: string;
  bg: string;
}

@Component({
  selector: 'app-portals',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PageHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTextComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './portals.page.html',
})
export class PortalsPage {
  readonly iconSearch = LucideSearch;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconStar = LucideStar;

  searchValue = signal<string>('');

  readonly categories: PortalCategoryDef[] = [
    {
      id: 'segreteria',
      label: 'Segreteria',
      icon: LucideBuilding2,
      color: 'var(--color-primary-dark)',
      bg: 'var(--color-primary-light)',
    },
    {
      id: 'didattica',
      label: 'Didattica',
      icon: LucideBookOpen,
      color: 'var(--color-secondary-dark)',
      bg: 'var(--color-secondary-light)',
    },
    {
      id: 'email',
      label: 'Email & Comunicazione',
      icon: LucideMail,
      color: 'var(--color-tertiary-dark)',
      bg: 'var(--color-tertiary-light)',
    },
    {
      id: 'borse',
      label: 'Borse & Servizi',
      icon: LucideWallet,
      color: 'var(--color-success-dark)',
      bg: 'var(--color-success-light)',
    },
    {
      id: 'carriera',
      label: 'Carriera',
      icon: LucideBriefcase,
      color: 'var(--color-warning-dark)',
      bg: 'var(--color-warning-light)',
    },
    {
      id: 'collaborazione',
      label: 'Collaborazione',
      icon: LucideUsers,
      color: 'var(--color-info-dark)',
      bg: 'var(--color-info-light)',
    },
    {
      id: 'benessere',
      label: 'Benessere & Supporto',
      icon: LucideShield,
      color: 'var(--color-error-dark)',
      bg: 'var(--color-error-light)',
    },
    {
      id: 'internazionale',
      label: 'Internazionale',
      icon: LucideGraduationCap,
      color: 'var(--color-primary-dark)',
      bg: 'var(--color-primary-light)',
    },
  ];

  // @TODO — dati reali da service/config per ateneo
  readonly portals: Portal[] = [
    // SEGRETERIA
    {
      id: 'esse3',
      name: 'ESSE3 — Cineca',
      description:
        'Portale ufficiale per iscrizioni, pagamento tasse, piano di studi e gestione carriera universitaria.',
      url: 'https://esse3.unimol.it',
      category: 'segreteria',
      tags: ['iscrizione', 'tasse', 'carriera', 'libretto'],
      featured: true,
    },
    {
      id: 'ateneo',
      name: 'Portale di Ateneo',
      description:
        "Sito ufficiale dell'università con news, bandi, regolamenti e informazioni istituzionali.",
      url: 'https://www.unimol.it',
      category: 'segreteria',
      tags: ['notizie', 'bandi', 'regolamenti'],
    },
    {
      id: 'sportello',
      name: 'Sportello Online',
      description:
        'Prenotazione appuntamenti con la segreteria studenti e invio pratiche amministrative.',
      url: 'https://sportello.unimol.it',
      category: 'segreteria',
      tags: ['appuntamenti', 'segreteria', 'pratiche'],
    },
    {
      id: 'pagopa',
      name: 'PagoPA — Tasse universitarie',
      description: 'Pagamento online delle tasse universitarie tramite il sistema PagoPA.',
      url: 'https://www.pagopa.gov.it',
      category: 'segreteria',
      tags: ['pagamento', 'tasse', 'bollettino'],
    },

    // DIDATTICA
    {
      id: 'moodle',
      name: 'Moodle',
      description:
        'Piattaforma e-learning per accedere ai materiali didattici, consegna elaborati e forum dei corsi.',
      url: 'https://moodle.unimol.it',
      category: 'didattica',
      tags: ['materiali', 'corsi', 'esercizi', 'forum'],
      featured: true,
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description:
        'Piattaforma per lezioni in streaming, riunioni con docenti e collaborazione tra studenti.',
      url: 'https://teams.microsoft.com',
      category: 'didattica',
      tags: ['lezioni', 'streaming', 'riunioni'],
    },
    {
      id: 'classroom',
      name: 'Google Classroom',
      description: 'Gestione classi virtuali, consegna compiti e feedback dai docenti.',
      url: 'https://classroom.google.com',
      category: 'didattica',
      tags: ['compiti', 'classi virtuali', 'feedback'],
    },
    {
      id: 'mediatheca',
      name: 'Biblioteca Digitale',
      description:
        'Accesso a riviste scientifiche, libri digitali, banche dati e risorse accademiche.',
      url: 'https://biblioteche.unimol.it',
      category: 'didattica',
      tags: ['libri', 'riviste', 'banche dati', 'ricerca'],
    },

    // EMAIL
    {
      id: 'gmail-uni',
      name: 'Gmail Universitaria',
      description:
        'Casella email istituzionale su Google Workspace. Comunicazioni ufficiali da docenti e segreteria.',
      url: 'https://mail.google.com',
      category: 'email',
      tags: ['email', 'posta', 'comunicazioni'],
      featured: true,
    },
    {
      id: 'outlook',
      name: 'Outlook — Microsoft 365',
      description:
        'Accesso alla suite Microsoft 365 con email, calendario, OneDrive e Office online.',
      url: 'https://outlook.office.com',
      category: 'email',
      tags: ['email', 'calendario', 'office', 'onedrive'],
    },

    // BORSE & SERVIZI
    {
      id: 'dsu',
      name: 'DSU Molise — Borse di Studio',
      description:
        'Portale per domande di borsa di studio, alloggi universitari e servizi per il diritto allo studio.',
      url: 'https://www.dsumolise.it',
      category: 'borse',
      tags: ['borsa di studio', 'alloggio', 'mensa', 'diritto allo studio'],
      featured: true,
    },
    {
      id: 'inps-studenti',
      name: 'INPS — Bonus Studenti',
      description:
        'Portale INPS per accedere a bonus e agevolazioni dedicate agli studenti universitari.',
      url: 'https://www.inps.it',
      category: 'borse',
      tags: ['bonus', 'agevolazioni', 'inps'],
    },
    {
      id: 'mensa',
      name: 'Mensa Universitaria',
      description: 'Consultazione menù, orari e prenotazione pasti nelle mense del DSU Molise.',
      url: 'https://www.dsumolise.it/mensa',
      category: 'borse',
      tags: ['mensa', 'pasti', 'orari'],
    },
    {
      id: 'trasporti-agevolati',
      name: 'Trasporti Agevolati',
      description:
        'Richiesta di abbonamenti agevolati per il trasporto pubblico dedicati agli studenti universitari.',
      url: 'https://www.regione.molise.it/trasporti',
      category: 'borse',
      tags: ['abbonamento', 'bus', 'agevolazione', 'trasporto'],
    },

    // CARRIERA
    {
      id: 'almalaurea',
      name: 'AlmaLaurea',
      description:
        'Consorzio interuniversitario per il profilo e curriculum dei laureati italiani. CV online e statistiche occupazionali.',
      url: 'https://www.almalaurea.it',
      category: 'carriera',
      tags: ['cv', 'lavoro', 'laureati', 'occupazione'],
      featured: true,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description:
        'Rete professionale per costruire il profilo lavorativo, cercare stage e opportunità di lavoro.',
      url: 'https://www.linkedin.com',
      category: 'carriera',
      tags: ['networking', 'lavoro', 'stage', 'professionale'],
    },
    {
      id: 'jobteaser',
      name: 'Jobteaser',
      description:
        'Piattaforma per studenti e neolaureati con offerte di stage, tirocini e primo impiego.',
      url: 'https://www.jobteaser.com',
      category: 'carriera',
      tags: ['stage', 'tirocinio', 'lavoro', 'offerte'],
    },
    {
      id: 'placement',
      name: 'Placement Universitario',
      description:
        "Ufficio placement dell'ateneo per supporto alla ricerca del lavoro, orientamento e tirocini.",
      url: 'https://placement.unimol.it',
      category: 'carriera',
      tags: ['tirocinio', 'orientamento', 'placement'],
    },

    // COLLABORAZIONE
    {
      id: 'drive',
      name: 'Google Drive',
      description: "Archiviazione e condivisione documenti su cloud con l'account universitario.",
      url: 'https://drive.google.com',
      category: 'collaborazione',
      tags: ['cloud', 'documenti', 'condivisione'],
    },
    {
      id: 'onedrive',
      name: 'OneDrive — Microsoft',
      description:
        'Archiviazione cloud Microsoft con integrazione Office 365 e accesso da qualsiasi dispositivo.',
      url: 'https://onedrive.live.com',
      category: 'collaborazione',
      tags: ['cloud', 'office', 'documenti'],
    },
    {
      id: 'notion',
      name: 'Notion',
      description:
        'Strumento per prendere appunti, organizzare progetti di gruppo e gestire la propria produttività.',
      url: 'https://www.notion.so',
      category: 'collaborazione',
      tags: ['appunti', 'produttività', 'progetti'],
    },
    {
      id: 'overleaf',
      name: 'Overleaf — LaTeX',
      description:
        'Editor LaTeX collaborativo online per tesi, articoli scientifici e documenti accademici.',
      url: 'https://www.overleaf.com',
      category: 'collaborazione',
      tags: ['latex', 'tesi', 'documenti', 'accademico'],
    },

    // BENESSERE
    {
      id: 'cus',
      name: 'CUS — Centro Universitario Sportivo',
      description:
        "Attività sportive, corsi e strutture del Centro Universitario Sportivo dell'ateneo.",
      url: 'https://www.cusunimol.it',
      category: 'benessere',
      tags: ['sport', 'palestra', 'corsi', 'attività'],
    },
    {
      id: 'counseling',
      name: 'Counseling Psicologico',
      description:
        'Servizio di supporto psicologico gratuito per studenti. Prenotazione colloqui con psicologi universitari.',
      url: 'https://www.unimol.it/counseling',
      category: 'benessere',
      tags: ['supporto', 'psicologia', 'benessere', 'salute'],
    },
    {
      id: 'disabilita',
      name: 'Ufficio Disabilità & DSA',
      description:
        "Servizi e supporto per studenti con disabilità, disturbi specifici dell'apprendimento e BES.",
      url: 'https://www.unimol.it/disabilita',
      category: 'benessere',
      tags: ['disabilità', 'dsa', 'supporto', 'inclusione'],
    },

    // INTERNAZIONALE
    {
      id: 'erasmus',
      name: 'Erasmus+ — Portale Ateneo',
      description:
        "Informazioni, bandi e candidature per programmi Erasmus+ di studio e tirocinio all'estero.",
      url: 'https://www.unimol.it/erasmus',
      category: 'internazionale',
      tags: ['erasmus', 'estero', 'mobilità', 'borse'],
      featured: true,
    },
    {
      id: 'erasmus-portal',
      name: 'Erasmus Without Paper',
      description:
        'Portale ufficiale EU per la gestione digitale dei documenti Erasmus (OLA, LA, nominative).',
      url: 'https://www.erasmus-ewp.eu',
      category: 'internazionale',
      tags: ['erasmus', 'documenti', 'accordi', 'ola'],
    },
    {
      id: 'duolingo',
      name: 'Duolingo',
      description:
        "App per l'apprendimento delle lingue straniere. Utile per prepararsi alla mobilità internazionale.",
      url: 'https://www.duolingo.com',
      category: 'internazionale',
      tags: ['lingue', 'apprendimento', 'internazionale'],
    },
  ];

  readonly featuredPortals = computed(() => this.portals.filter(p => p.featured));

  readonly filteredPortals = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.portals;
    return this.portals.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        this.categoryDef(p.category)?.label.toLowerCase().includes(q),
    );
  });

  readonly filteredCategories = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.categories;
    const visibleCatIds = new Set(this.filteredPortals().map(p => p.category));
    return this.categories.filter(c => visibleCatIds.has(c.id));
  });

  readonly isSearching = computed(() => this.searchValue().trim().length > 0);

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  portalsForCategory(categoryId: PortalCategory): Portal[] {
    return this.filteredPortals().filter(p => p.category === categoryId);
  }

  categoryDef(id: PortalCategory): PortalCategoryDef | undefined {
    return this.categories.find(c => c.id === id);
  }

  totalCount = computed(() => this.filteredPortals().length);
}
