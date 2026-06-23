import { Component, input } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideCamera,
  LucideMail,
  LucidePhone,
  LucideMapPin,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomAvatarComponent } from '@ui/custom-avatar/custom-avatar.component';
import { ProfiloResponse } from '../../../../../domain/models/profilo.model';

@Component({
  selector: 'app-profile-hero',
  standalone: true,
  imports: [CustomCardComponent, CustomAvatarComponent, LucideDynamicIcon],
  templateUrl: './profile-hero.component.html',
})
export class ProfileHeroComponent {
  readonly profilo = input.required<ProfiloResponse>();

  readonly iconCamera = LucideCamera;
  readonly iconMail = LucideMail;
  readonly iconPhone = LucidePhone;
  readonly iconMapPin = LucideMapPin;

  get nomeCompleto(): string {
    const p = this.profilo();
    const nome = p.nome.charAt(0).toUpperCase() + p.nome.slice(1).toLowerCase();
    const cognome = p.cognome.charAt(0).toUpperCase() + p.cognome.slice(1).toLowerCase();
    return `${nome} ${cognome}`;
  }
}
