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

import {
  ContactCampus,
  SecretariatContact,
  ProfessorContact,
  InstitutionalContact,
} from '@shared/types/dashboard/university-contacts.types';
import {
  MOCK_SECRETARIAT_CONTACTS,
  MOCK_PROFESSOR_CONTACTS,
  MOCK_INSTITUTIONAL_CONTACTS,
} from '@shared/data/mock/university-contacts.mock';

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

  readonly secretariatContacts: SecretariatContact[] = MOCK_SECRETARIAT_CONTACTS;
  readonly professorContacts: ProfessorContact[] = MOCK_PROFESSOR_CONTACTS;
  readonly institutionalContacts: InstitutionalContact[] = MOCK_INSTITUTIONAL_CONTACTS;

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
