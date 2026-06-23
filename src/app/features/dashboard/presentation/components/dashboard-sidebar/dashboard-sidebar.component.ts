import { Component, input, output, ViewChild, inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucidePanelLeftClose, LucidePanelLeftOpen, LucideLogOut } from '@lucide/angular';
import { APP, SIDEBAR_ITEMS, SIDEBAR_BOTTOM_ITEMS } from '@constants';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomAvatarComponent, AvatarVariant } from '@ui/custom-avatar/custom-avatar.component';
import {
  AvatarProfilePanelComponent,
  AccountEntry,
  AccountStatus,
  RING_COLORS,
  STATUS_VARIANT,
} from '@ui/avatar-profile-panel/avatar-profile-panel.component';
import { SidebarItem } from '@constants';
import { AuthFacade } from 'src/app/features/auth/application/facades/auth.facade';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [
    NgComponentOutlet,
    RouterLink,
    RouterLinkActive,
    CustomButtonComponent,
    CustomAvatarComponent,
    AvatarProfilePanelComponent,
  ],
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent {
  readonly APP = APP;

  private readonly router = inject(Router);
  private readonly auth = inject(AuthFacade);

  readonly open = input.required<boolean>();
  readonly toggleSidebar = output<void>();
  readonly linkClicked = output<void>();

  readonly iconPanelClose = LucidePanelLeftClose;
  readonly iconPanelOpen = LucidePanelLeftOpen;
  readonly iconLogout = LucideLogOut;

  readonly isMobileOpen = input<boolean>(false);

  readonly sidebarItems = SIDEBAR_ITEMS;
  readonly sidebarBottomItems = SIDEBAR_BOTTOM_ITEMS;

  @ViewChild('profilePanelRef') profilePanelRef!: AvatarProfilePanelComponent;

  readonly accounts: AccountEntry[] = [
    {
      id: 'acc-1',
      name: 'Mario Rossi',
      email: 'mario.rossi@studenti.unibo.it',
      courseLabel: 'Ingegneria Informatica',
      courseAcronym: 'LM',
      universityLabel: 'Università di Bologna',
      status: 'active',
      isCurrent: true,
    },
    {
      id: 'acc-2',
      name: 'Mario Rossi',
      email: 'mario.rossi@studenti.unipi.it',
      courseLabel: 'Fisica Teorica',
      courseAcronym: 'LMcu',
      universityLabel: 'Università di Pisa',
      status: 'warning',
    },
    {
      id: 'acc-3',
      name: 'Mario Rossi',
      email: 'mario.rossi@phd.unito.it',
      courseLabel: 'Dottorato in Matematica',
      courseAcronym: 'DOC',
      universityLabel: 'Università di Torino',
      status: 'graduated',
    },
  ];

  get currentAccount(): AccountEntry {
    return this.accounts.find(a => a.isCurrent) ?? this.accounts[0];
  }

  variantFor(status: AccountStatus): AvatarVariant {
    return STATUS_VARIANT[status];
  }

  ringColorFor(status: AccountStatus): string {
    return RING_COLORS[status];
  }

  iconColorStyle(item: SidebarItem): string {
    return `color: var(--color-${item.color}-dark);`;
  }

  iconBgStyle(item: SidebarItem): string {
    return `background: var(--color-${item.color}-light); color: var(--color-${item.color}-text);`;
  }

  iconActiveStyle(item: SidebarItem): string {
    return `background: var(--color-${item.color}-dark); color: var(--color-${item.color}-text);`;
  }

  linkActiveBgStyle(item: SidebarItem): string {
    return `background: var(--color-${item.color}-light);`;
  }

  onAccountSwitch(account: AccountEntry): void {
    console.log('Account selezionato:', account.id);
  }

  onLogout(): void {
    this.auth.logout().subscribe();
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/profilo']);
  }
}
