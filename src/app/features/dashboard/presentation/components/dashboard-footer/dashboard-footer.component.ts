import { Component, HostListener, ViewChild } from '@angular/core';
import { CustomModalComponent } from '@ui/custom-modal/custom-modal.component';
import { FooterComponent } from 'src/app/core/layout/footer/footer.component';
import { LucideDynamicIcon, LucideChevronUp } from '@lucide/angular';

@Component({
  selector: 'app-dashboard-footer',
  standalone: true,
  imports: [CustomModalComponent, FooterComponent, LucideDynamicIcon],
  templateUrl: './dashboard-footer.component.html',
})
export class DashboardFooterComponent {
  readonly iconChevronUp = LucideChevronUp;
  hovered = false;

  @ViewChild('footerModal') footerModal!: CustomModalComponent;

  openDrawer(): void {
    this.footerModal.open();
  }

  closeDrawer(): void {
    this.footerModal.close();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.footerModal.close();
  }
}
