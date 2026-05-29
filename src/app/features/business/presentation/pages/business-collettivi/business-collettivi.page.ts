import { Component } from '@angular/core';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import { USE_CASES, VANTAGGI } from '@constants';
import { UseCase } from '@types';

@Component({
  selector: 'app-business-collettivi-page',
  standalone: true,
  imports: [BusinessHeroComponent, BusinessCtaComponent],
  templateUrl: './business-collettivi.page.html',
})
export class BusinessCollettiviPage {
  readonly useCases: UseCase[] = USE_CASES;
  readonly vantaggi = VANTAGGI;
}
