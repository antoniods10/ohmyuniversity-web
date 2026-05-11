import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { LogoComponent } from '../../../shared/ui/logo/logo.component';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent, ClickOutsideDirective],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
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
