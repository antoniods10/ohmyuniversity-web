import { Component, signal } from '@angular/core';
import { ContattiFormAcademic } from '../components/contatti-form-academic/contatti-form-academic.component';
import { ContattiFormOrganization } from '../components/contatti-form-organization/contatti-form-organization.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

import { ContactTab } from '@types';
import { CustomTabsComponent } from '@ui/custom-tab/custom-tab.component';

@Component({
  selector: 'app-contatti-page',
  standalone: true,
  imports: [
    ContattiFormAcademic,
    ContattiFormOrganization,
    CustomBadgeComponent,
    CustomTextComponent,
    CustomTabsComponent,
  ],
  templateUrl: './contatti.page.html',
})
export class ContattiPage {
  readonly activeTab = signal<ContactTab>('academic');

  readonly tabs = [
    { id: 'academic', label: 'Sono un universitario' },
    { id: 'organization', label: "Sono un'organizzazione" },
  ];

  setTab(tab: string): void {
    this.activeTab.set(tab as ContactTab);
  }
}
