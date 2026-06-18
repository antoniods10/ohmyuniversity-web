import { Component, signal, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideDynamicIcon, LucideShieldCheck, LucideIdCard } from '@lucide/angular';
import { CustomTabsComponent } from '@ui/custom-tab/custom-tab.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { UniversitySearchSelectComponent } from '../university-search-select/university-search-select.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import { APP_NAME, UNIVERSITIES } from '@constants';
import { University } from '@types';

type UniversityTab = 'ateneo' | 'spid' | 'cie';

@Component({
  selector: 'app-university-login-form',
  standalone: true,
  imports: [
    FormsModule,
    CustomTabsComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomLinkComponent,
    CustomModalComponent,
    UniversitySearchSelectComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './university-login-form.component.html',
})
export class UniversityLoginFormComponent {
  readonly APP_NAME = APP_NAME;
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly iconShield = LucideShieldCheck;
  readonly iconCie = LucideIdCard;

  readonly recoveryModal = viewChild<CustomModalComponent>('recoveryModal');

  readonly activeTab = signal<UniversityTab>('ateneo');
  readonly tabs = [
    { id: 'ateneo', label: 'Ateneo' },
    { id: 'spid', label: 'SPID' },
    { id: 'cie', label: 'CIE' },
  ];

  readonly universities = UNIVERSITIES;

  selectedUniversity: University | undefined = undefined;
  email = '';
  password = '';

  readonly cieInfoUrl = 'https://www.cartaidentita.interno.gov.it';
  readonly spidInfoUrl = 'https://www.spid.gov.it';
  readonly spidNoSpidUrl = 'https://www.spid.gov.it/cos-e-spid/come-attivare-spid/';
  readonly spidHelpUrl = 'https://www.spid.gov.it/ottieni-assistenza-dagli-identity-provider/';

  get domainUnavailable(): boolean {
    return !!this.selectedUniversity && this.selectedUniversity.emailDomains.length === 0;
  }

  get emailError(): string {
    const uni = this.selectedUniversity;
    const value = this.email.trim();

    if (!uni || !value) return '';
    if (this.domainUnavailable) return '';

    const domain = value.split('@')[1]?.toLowerCase();
    if (!domain) return 'Inserisci un indirizzo email valido';

    const isValid = uni.emailDomains.some(d => d.toLowerCase() === domain);
    if (!isValid) {
      return `L'email deve appartenere a uno dei domini di ${uni.shortName} (es. nome@${uni.emailDomains[0]})`;
    }
    return '';
  }

  get canSubmit(): boolean {
    return (
      !!this.selectedUniversity &&
      !this.domainUnavailable &&
      !!this.email.trim() &&
      !this.emailError &&
      !!this.password.trim()
    );
  }

  setTab(tab: string): void {
    this.activeTab.set(tab as UniversityTab);
  }

  onUniversitySelected(uni: University): void {
    this.selectedUniversity = uni;
    this.email = '';
  }

  submit(): void {
    if (!this.canSubmit) return;
    this.router.navigate(['/dashboard']);
  }

  notifyUnavailable(provider: 'SPID' | 'CIE'): void {
    this.toast.show(`L'accesso con ${provider} non è ancora attivo.`, 'warning');
  }

  openRecoveryModal(): void {
    this.recoveryModal()?.open();
  }
}
