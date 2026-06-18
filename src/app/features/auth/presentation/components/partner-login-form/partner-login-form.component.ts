/**
 * @file partner-login-form.component.ts
 * @description Classic email/password login form for partner organizations
 * (companies and student collectives). Not yet wired to real authentication;
 * submitting shows a "not available" toast. Registration link points to the
 * contact form pre-filtered on the organization tab.
 */

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { ToastService } from '@ui/custom-toast/toast.service';

@Component({
  selector: 'app-partner-login-form',
  standalone: true,
  imports: [FormsModule, RouterLink, CustomButtonComponent, CustomInputComponent],
  templateUrl: './partner-login-form.component.html',
})
export class PartnerLoginFormComponent {
  private readonly toast = inject(ToastService);

  email = '';
  password = '';

  get canSubmit(): boolean {
    return !!this.email.trim() && !!this.password.trim();
  }

  submit(): void {
    if (!this.canSubmit) return;
    this.toast.show('Il login organizzazioni non è ancora attivo.', 'warning');
  }

  notifyPasswordRecoveryUnavailable(): void {
    this.toast.show('Il recupero password non è ancora disponibile.', 'warning');
  }
}
