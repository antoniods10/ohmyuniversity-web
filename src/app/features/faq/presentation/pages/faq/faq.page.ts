import { Component } from '@angular/core';
import { FaqHeroComponent } from '../../components/faq-hero/faq-hero.component';
import { FaqListComponent } from '../../components/faq-list/faq-list.component';
import { FAQ_CATEGORIES } from '@constants';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [FaqHeroComponent, FaqListComponent],
  templateUrl: './faq.page.html',
})
export class FaqPage {
  readonly categories = FAQ_CATEGORIES;
}
