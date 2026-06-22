import { Component, signal, computed, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebarComponent } from '../components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardTopbarComponent } from '../components/dashboard-topbar/dashboard-topbar.component';
import { DashboardFooterComponent } from '../components/dashboard-footer/dashboard-footer.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardSidebarComponent,
    DashboardTopbarComponent,
    DashboardFooterComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  readonly sidebarOpen = signal(true);
  readonly mobileMenuOpen = signal(false);
  readonly isMobile = signal(window.innerWidth < 1024);

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile.set(window.innerWidth < 1024);
    if (!this.isMobile()) {
      this.mobileMenuOpen.set(false);
    }
  }

  onToggleSidebar(): void {
    if (this.isMobile()) {
      this.mobileMenuOpen.update(v => !v);
    } else {
      this.sidebarOpen.update(v => !v);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
