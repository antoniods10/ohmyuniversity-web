import { Component } from '@angular/core';
import { LucideCheck } from '@lucide/angular';
import { BusinessCtaComponent } from '../../components/business-cta/business-cta.component';
import { BusinessHeroComponent } from '../../components/business-hero/business-hero.component';
import { CardSimpleComponent, CardMinimalComponent } from '@ui/custom-card/card-variants.component';
import { USE_CASES, VANTAGGI } from '@constants';
import { UseCase } from '@types';

@Component({
  selector: 'app-business-collettivi-page',
  standalone: true,
  imports: [BusinessHeroComponent, BusinessCtaComponent, CardSimpleComponent, CardMinimalComponent],
  templateUrl: './business-collettivi.page.html',
})
export class BusinessCollettiviPage {
  readonly iconCheck = LucideCheck;
  readonly useCases: UseCase[] = USE_CASES;
  readonly vantaggi = VANTAGGI;
}
