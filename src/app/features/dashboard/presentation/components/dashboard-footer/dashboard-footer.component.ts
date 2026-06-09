import { Component, HostListener, signal } from '@angular/core';
import { LucideChevronUp, LucideX } from '@lucide/angular';
import { FooterComponent } from 'src/app/core/layout/footer/footer.component';

@Component({
  selector: 'app-dashboard-footer',
  standalone: true,
  imports: [LucideChevronUp, LucideX, FooterComponent],
  templateUrl: './dashboard-footer.component.html',
})
export class DashboardFooterComponent {
  readonly drawerOpen = signal(false);

  openDrawer(): void {
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.drawerOpen()) {
      this.closeDrawer();
    }
  }
}
