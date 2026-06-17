import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideMenu } from '@lucide/angular';
import { APP_LOGO, APP_NAME } from '@constants';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';

export interface NavLink {
  label: string;
  path: string;
  accent?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, CustomButtonComponent, CustomModalComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly APP_NAME = APP_NAME;
  readonly APP_LOGO = APP_LOGO;

  readonly iconMenu = LucideMenu;

  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Orientamento', path: '/orientamento' },
    { label: 'Chi Siamo', path: '/chi-siamo' },
    { label: 'Partner', path: '/partner', accent: true },
    { label: 'Contattaci', path: '/contatti' },
  ];
}
