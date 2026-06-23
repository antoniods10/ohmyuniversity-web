import { Component, input, output, inject, OnInit, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucidePanelLeftClose, LucidePanelLeftOpen, LucideLogOut } from '@lucide/angular';
import {
  APP,
  SIDEBAR_ITEMS,
  SIDEBAR_BOTTOM_ITEMS,
  UNIVERSITIES,
  SidebarItem,
} from '@shared/constants';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomAvatarComponent, AvatarVariant } from '@ui/custom-avatar/custom-avatar.component';
import {
  AvatarProfilePanelComponent,
  AccountEntry,
  AccountStatus,
  RING_COLORS,
  STATUS_VARIANT,
} from '@ui/avatar-profile-panel/avatar-profile-panel.component';
import { AuthFacade } from 'src/app/features/auth/application/facades/auth.facade';
import { CarrieraFacade } from 'src/app/features/dashboard/application/facades/carriera.facade';
import { forkJoin } from 'rxjs';

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
export class DashboardSidebarComponent implements OnInit {
  readonly APP = APP;

  private readonly router = inject(Router);
  private readonly auth = inject(AuthFacade);
  private readonly carriera = inject(CarrieraFacade);

  readonly open = input.required<boolean>();
  readonly toggleSidebar = output<void>();
  readonly linkClicked = output<void>();
  readonly isMobileOpen = input<boolean>(false);

  readonly iconPanelClose = LucidePanelLeftClose;
  readonly iconPanelOpen = LucidePanelLeftOpen;
  readonly iconLogout = LucideLogOut;

  readonly sidebarItems = SIDEBAR_ITEMS;
  readonly sidebarBottomItems = SIDEBAR_BOTTOM_ITEMS;

  readonly currentAccount = signal<AccountEntry>({
    id: 'current',
    name: this.auth.getNomeCompleto(),
    email: '',
    courseLabel: '',
    courseAcronym: '',
    universityLabel: this.universityLabel(this.auth.getUniversityId()),
    status: 'active',
    isCurrent: true,
  });

  readonly accounts = signal<AccountEntry[]>([this.currentAccount()]);
  readonly fotoUrl = signal<string>('');

  ngOnInit(): void {
    forkJoin({
      badge: this.carriera.getBadge(),
      profilo: this.carriera.getProfilo(),
      info: this.carriera.getCarrieraInfo(),
      foto: this.carriera.getFoto(),
    }).subscribe({
      next: ({ badge, profilo, info, foto }) => {
        this.fotoUrl.set(URL.createObjectURL(foto));

        const updated: AccountEntry = {
          id: 'current',
          name: this.auth.getNomeCompleto(),
          email: profilo.emailAte ?? '',
          courseLabel: info.cdsDes ?? badge.desCds ?? '',
          courseAcronym: this.tipoCorsoAcronym(info.tipoCorsoCod),
          universityLabel: this.universityLabel(this.auth.getUniversityId()),
          avatarSrc: URL.createObjectURL(foto),
          status: 'active',
          isCurrent: true,
        };
        this.currentAccount.set(updated);
        this.accounts.set([updated]);
      },
      error: () => {},
    });
  }

  private tipoCorsoAcronym(tipoCorsoCod: string | null): string {
    if (!tipoCorsoCod) return 'L';
    if (tipoCorsoCod.startsWith('LM')) return 'LM';
    if (tipoCorsoCod.startsWith('L')) return 'L';
    if (tipoCorsoCod.startsWith('D')) return 'DOC';
    if (tipoCorsoCod.startsWith('M')) return 'MASTER';
    return tipoCorsoCod;
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

  iconActiveStyle(item: SidebarItem): string {
    return `background: var(--color-${item.color}-dark); color: var(--color-${item.color}-text);`;
  }

  linkActiveBgStyle(item: SidebarItem): string {
    return `background: var(--color-${item.color}-light);`;
  }

  onAccountSwitch(_account: AccountEntry): void {
    // @TODO
  }

  onLogout(): void {
    this.auth.logout().subscribe();
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/profilo']);
  }

  private universityLabel(universityId: string | null): string {
    if (!universityId) return 'Università';
    const found = UNIVERSITIES.find(u => u.id === universityId.toLowerCase());
    return found?.shortName ?? universityId;
  }
}
