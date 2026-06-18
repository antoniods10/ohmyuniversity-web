import { Component, signal, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideExternalLink,
  LucideGraduationCap,
  LucideMail,
  LucideBookOpen,
  LucideBriefcase,
  LucideWallet,
  LucideBuilding2,
  LucideUsers,
  LucideShield,
  LucideStar,
} from '@lucide/angular';
import { PortalCategory, Portal, PortalCategoryDef } from '@shared/types/features/portals.types';
import { MOCK_PORTALS } from '@shared/data/mock/portals.mock';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';

@Component({
  selector: 'app-portals',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DashboardContainerComponent,
    DashboardHeaderComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTextComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './portals.page.html',
})
export class PortalsPage {
  readonly iconSearch = LucideSearch;
  readonly iconExternalLink = LucideExternalLink;
  readonly iconStar = LucideStar;

  searchValue = signal<string>('');

  readonly categories: PortalCategoryDef[] = [
    {
      id: 'segreteria',
      label: 'Segreteria',
      icon: LucideBuilding2,
      color: 'var(--color-primary-dark)',
      bg: 'var(--color-primary-light)',
    },
    {
      id: 'didattica',
      label: 'Didattica',
      icon: LucideBookOpen,
      color: 'var(--color-secondary-dark)',
      bg: 'var(--color-secondary-light)',
    },
    {
      id: 'email',
      label: 'Email & Comunicazione',
      icon: LucideMail,
      color: 'var(--color-tertiary-dark)',
      bg: 'var(--color-tertiary-light)',
    },
    {
      id: 'borse',
      label: 'Borse & Servizi',
      icon: LucideWallet,
      color: 'var(--color-success-dark)',
      bg: 'var(--color-success-light)',
    },
    {
      id: 'carriera',
      label: 'Carriera',
      icon: LucideBriefcase,
      color: 'var(--color-warning-dark)',
      bg: 'var(--color-warning-light)',
    },
    {
      id: 'collaborazione',
      label: 'Collaborazione',
      icon: LucideUsers,
      color: 'var(--color-info-dark)',
      bg: 'var(--color-info-light)',
    },
    {
      id: 'benessere',
      label: 'Benessere & Supporto',
      icon: LucideShield,
      color: 'var(--color-error-dark)',
      bg: 'var(--color-error-light)',
    },
    {
      id: 'internazionale',
      label: 'Internazionale',
      icon: LucideGraduationCap,
      color: 'var(--color-primary-dark)',
      bg: 'var(--color-primary-light)',
    },
  ];

  readonly portals: Portal[] = MOCK_PORTALS;

  readonly featuredPortals = computed(() => this.portals.filter(p => p.featured));

  readonly filteredPortals = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.portals;
    return this.portals.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        this.categoryDef(p.category)?.label.toLowerCase().includes(q),
    );
  });

  readonly filteredCategories = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    if (!q) return this.categories;
    const visibleCatIds = new Set(this.filteredPortals().map(p => p.category));
    return this.categories.filter(c => visibleCatIds.has(c.id));
  });

  readonly isSearching = computed(() => this.searchValue().trim().length > 0);

  readonly totalCount = computed(() => this.filteredPortals().length);

  onSearchChange(val: string | number): void {
    this.searchValue.set(String(val));
  }

  portalsForCategory(categoryId: PortalCategory): Portal[] {
    return this.filteredPortals().filter(p => p.category === categoryId);
  }

  categoryDef(id: PortalCategory): PortalCategoryDef | undefined {
    return this.categories.find(c => c.id === id);
  }
}
