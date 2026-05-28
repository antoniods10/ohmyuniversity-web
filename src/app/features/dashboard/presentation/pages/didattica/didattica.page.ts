import { Component, signal } from '@angular/core';

type TabId = 'panoramica' | 'esami' | 'piano-studi' | 'segreteria';

@Component({
  selector: 'app-didattica-page',
  imports: [],
  templateUrl: './didattica.page.html',
})
export class DidatticaPage {
  readonly activeTab = signal<TabId>('panoramica');
}
