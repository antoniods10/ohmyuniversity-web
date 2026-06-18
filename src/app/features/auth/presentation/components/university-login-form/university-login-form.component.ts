import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideDynamicIcon, LucideShieldCheck, LucideIdCard } from '@lucide/angular';
import { CustomTabsComponent } from '@ui/custom-tab/custom-tab.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent, SelectOption } from '@ui/custom-input/custom-input.component';
import { ToastService } from '@ui/custom-toast/toast.service';
import { UNIVERSITIES } from '@constants';
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
    LucideDynamicIcon,
  ],
  templateUrl: './university-login-form.component.html',
})
export class UniversityLoginFormComponent {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  readonly iconShield = LucideShieldCheck;
  readonly iconCie = LucideIdCard;

  readonly activeTab = signal<UniversityTab>('ateneo');
  readonly tabs = [
    { id: 'ateneo', label: 'Ateneo' },
    { id: 'spid', label: 'SPID' },
    { id: 'cie', label: 'CIE' },
  ];

  readonly universities = UNIVERSITIES;
  readonly universityOptions: SelectOption[] = UNIVERSITIES.map(u => ({
    value: u.id,
    label: u.shortName,
  }));

  selectedUniversityId = '';
  email = '';
  password = '';

  get selectedUniversity(): University | undefined {
    return this.universities.find(u => u.id === this.selectedUniversityId);
  }

  get domainUnavailable(): boolean {
    const uni = this.selectedUniversity;
    return !!uni && uni.emailDomains.length === 0;
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

  onUniversityChange(): void {
    this.email = '';
  }

  submit(): void {
    if (!this.canSubmit) return;
    this.router.navigate(['/dashboard']);
  }

  notifyUnavailable(provider: 'SPID' | 'CIE'): void {
    this.toast.show(`L'accesso con ${provider} non è ancora attivo.`, 'warning');
  }
}
