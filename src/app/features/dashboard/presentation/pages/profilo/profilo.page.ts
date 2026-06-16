import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomAvatarComponent, AvatarVariant } from '@ui/custom-avatar/custom-avatar.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import {
  LucideDynamicIcon,
  LucideUser,
  LucideMail,
  LucidePhone,
  LucideMapPin,
  LucideCalendar,
  LucidePencil,
  LucideShield,
  LucideGraduationCap,
  LucideBookOpen,
  LucideAward,
  LucideKey,
  LucideLogOut,
  LucideTriangleAlert,
  LucideCheck,
  LucideCamera,
  LucideExternalLink,
} from '@lucide/angular';
import {
  AccountEntry,
  AccountStatus,
  RING_COLORS,
  STATUS_VARIANT,
} from '@ui/avatar-profile-panel/avatar-profile-panel.component';
import { CustomTabsComponent, TabItem } from '@ui/custom-tab/custom-tab.component';

import { CourseEntry } from '@shared/types/dashboard/profilo.types';
import { MOCK_ACCOUNT, MOCK_COURSES, MOCK_PROFILE_EDIT } from '@shared/data/mock/profilo.mock';

@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [
    FormsModule,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTabsComponent,
    CustomTextComponent,
    CustomAvatarComponent,
    CustomModalComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './profilo.page.html',
})
export class ProfiloPage {
  readonly iconUser = LucideUser;
  readonly iconMail = LucideMail;
  readonly iconPhone = LucidePhone;
  readonly iconMapPin = LucideMapPin;
  readonly iconCalendar = LucideCalendar;
  readonly iconPencil = LucidePencil;
  readonly iconShield = LucideShield;
  readonly iconGraduationCap = LucideGraduationCap;
  readonly iconBookOpen = LucideBookOpen;
  readonly iconAward = LucideAward;
  readonly iconKey = LucideKey;
  readonly iconLogOut = LucideLogOut;
  readonly iconAlertTriangle = LucideTriangleAlert;
  readonly iconCheck = LucideCheck;
  readonly iconCamera = LucideCamera;
  readonly iconExternalLink = LucideExternalLink;

  activeTab = signal<string>('informazioni');
  editingInfo = signal<boolean>(false);
  savingInfo = signal<boolean>(false);
  savedInfo = signal<boolean>(false);

  readonly tabs: TabItem[] = [
    { id: 'informazioni', label: 'Informazioni', icon: LucideUser },
    { id: 'corsi', label: 'Corsi', icon: LucideGraduationCap },
    { id: 'sicurezza', label: 'Sicurezza', icon: LucideShield },
  ];

  readonly account: AccountEntry = MOCK_ACCOUNT;
  readonly courses: CourseEntry[] = MOCK_COURSES;

  editNameModel: string = MOCK_ACCOUNT.name;
  editPhoneModel: string = MOCK_PROFILE_EDIT.phone;
  editCityModel: string = MOCK_PROFILE_EDIT.city;
  editBioModel: string = MOCK_PROFILE_EDIT.bio;
  emailModel: string = MOCK_ACCOUNT.email;

  onTabChange(id: string): void {
    this.activeTab.set(id);
  }

  toggleEdit(): void {
    if (this.editingInfo()) {
      this.editingInfo.set(false);
    } else {
      this.editingInfo.set(true);
      this.savedInfo.set(false);
    }
  }

  saveInfo(): void {
    this.savingInfo.set(true);
    // @TODO
    setTimeout(() => {
      this.savingInfo.set(false);
      this.savedInfo.set(true);
      this.editingInfo.set(false);
    }, 1200);
  }

  onFieldChange(_field: string, _val: string | number): void {}

  variantFor(status: AccountStatus): AvatarVariant {
    return STATUS_VARIANT[status];
  }

  ringColorFor(status: AccountStatus): string {
    return RING_COLORS[status];
  }

  statusLabel(status: AccountStatus): string {
    const map: Record<AccountStatus, string> = {
      active: 'Iscritto',
      warning: 'Attenzione',
      suspended: 'Sospeso',
      withdrawn: 'Ritirato',
      graduated: 'Laureato',
    };
    return map[status];
  }

  statusVariant(status: AccountStatus): 'success' | 'warning' | 'error' | 'neutral' | 'primary' {
    const map: Record<AccountStatus, 'success' | 'warning' | 'error' | 'neutral' | 'primary'> = {
      active: 'success',
      warning: 'warning',
      suspended: 'error',
      withdrawn: 'neutral',
      graduated: 'primary',
    };
    return map[status];
  }

  acronymVariant(acronym: string): 'primary' | 'secondary' | 'tertiary' | 'success' {
    const map: Record<string, 'primary' | 'secondary' | 'tertiary' | 'success'> = {
      L: 'primary',
      LM: 'secondary',
      LMcu: 'tertiary',
      DOC: 'success',
    };
    return map[acronym] ?? 'primary';
  }

  cfuPercent(cfu: number, total: number): number {
    return Math.round((cfu / total) * 100);
  }
}
