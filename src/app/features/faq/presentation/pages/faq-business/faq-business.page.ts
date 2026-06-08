import { Component } from '@angular/core';
import { FaqHeroComponent } from '../../components/faq-hero/faq-hero.component';
import { FaqListComponent } from '../../components/faq-list/faq-list.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { FAQ_BUSINESS_CATEGORIES } from '@constants';

@Component({
  selector: 'app-faq-business-page',
  standalone: true,
  imports: [FaqHeroComponent, FaqListComponent, CustomButtonComponent, CustomTextComponent],
  templateUrl: './faq-business.page.html',
})
export class FaqBusinessPage {
  readonly categories = FAQ_BUSINESS_CATEGORIES;
}
