import { Component } from '@angular/core';
import { FaqHeroComponent } from '../../components/faq-hero/faq-hero.component';
import { FaqListComponent } from '../../components/faq-list/faq-list.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { APP, FAQ_CATEGORIES } from '@shared/constants';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [FaqHeroComponent, FaqListComponent, CustomTextComponent],
  templateUrl: './faq.page.html',
})
export class FaqPage {
  readonly APP = APP;
  readonly categories = FAQ_CATEGORIES;
}
