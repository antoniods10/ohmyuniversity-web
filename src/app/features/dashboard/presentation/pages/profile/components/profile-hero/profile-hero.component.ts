import { Component, input, inject, OnInit, signal } from '@angular/core';
import { LucideDynamicIcon, LucideMail, LucidePhone, LucideMapPin } from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomAvatarComponent } from '@ui/custom-avatar/custom-avatar.component';
import { PersonaResponse } from '../../../../../../../core/domain/models/career/persona.model';
import { AuthFacade } from 'src/app/core/application/facades/auth.facade';
import { CareerFacade } from 'src/app/core/application/facades/career.facade';

@Component({
  selector: 'app-profile-hero',
  standalone: true,
  imports: [CustomCardComponent, CustomAvatarComponent, LucideDynamicIcon],
  templateUrl: './profile-hero.component.html',
})
export class ProfileHeroComponent implements OnInit {
  readonly profilo = input.required<PersonaResponse>();

  private readonly carriera = inject(CareerFacade);
  private readonly auth = inject(AuthFacade);

  readonly iconMail = LucideMail;
  readonly iconPhone = LucidePhone;
  readonly iconMapPin = LucideMapPin;

  readonly fotoUrl = signal<string>('');

  ngOnInit(): void {
    if (!this.auth.hasCarriera()) return;
    this.carriera.getAvatar().subscribe({
      next: blob => this.fotoUrl.set(URL.createObjectURL(blob)),
      error: () => {},
    });
  }

  get nomeCompleto(): string {
    const p = this.profilo();
    const nome = p.nome.charAt(0).toUpperCase() + p.nome.slice(1).toLowerCase();
    const cognome = p.cognome.charAt(0).toUpperCase() + p.cognome.slice(1).toLowerCase();
    return `${nome} ${cognome}`;
  }
}
