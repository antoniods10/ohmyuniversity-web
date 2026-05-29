import { Component, signal } from '@angular/core';
import { ContattiFormAcademic } from '../components/contatti-form-academic/contatti-form-academic.component';
import { ContattiFormOrganization } from '../components/contatti-form-organization/contatti-form-organization.component';
import { ContactTab } from '@types';

@Component({
  selector: 'app-contatti-page',
  standalone: true,
  imports: [ContattiFormAcademic, ContattiFormOrganization],
  templateUrl: './contatti.page.html',
})
export class ContattiPage {
  readonly activeTab = signal<ContactTab>('academic');

  setTab(tab: ContactTab): void {
    this.activeTab.set(tab);
  }
}
