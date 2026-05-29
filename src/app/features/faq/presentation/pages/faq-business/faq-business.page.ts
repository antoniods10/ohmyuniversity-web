import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqHeroComponent } from '../../components/faq-hero/faq-hero.component';
import { FaqListComponent } from '../../components/faq-list/faq-list.component';
import { FAQ_BUSINESS_CATEGORIES } from '@constants';

@Component({
  selector: 'app-faq-business-page',
  standalone: true,
  imports: [RouterLink, FaqHeroComponent, FaqListComponent],
  templateUrl: './faq-business.page.html',
})
export class FaqBusinessPage {
  readonly categories = FAQ_BUSINESS_CATEGORIES;
}
