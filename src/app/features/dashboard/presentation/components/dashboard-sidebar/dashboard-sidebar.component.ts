import { Component, input, output } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucidePanelLeftClose, LucidePanelLeftOpen, LucideGraduationCap } from '@lucide/angular';
import { SIDEBAR_BOTTOM_ITEMS, SIDEBAR_ITEMS } from '@constants';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [
    NgComponentOutlet,
    RouterLink,
    RouterLinkActive,
    LucidePanelLeftClose,
    LucidePanelLeftOpen,
    LucideGraduationCap,
  ],
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent {
  readonly open = input.required<boolean>();
  readonly toggleSidebar = output<void>();

  readonly sidebarItems = SIDEBAR_ITEMS;
  readonly sidebarBottomItems = SIDEBAR_BOTTOM_ITEMS;
}
