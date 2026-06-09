import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { APP_LOGO, APP_NAME } from '@constants';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ClickOutsideDirective],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly APP_NAME = APP_NAME;
  readonly APP_LOGO = APP_LOGO;

  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Orientamento', path: '/orientamento' },
    { label: 'Chi Siamo', path: '/chi-siamo' },
    { label: 'Contattaci', path: '/contatti' },
  ];

  readonly isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
