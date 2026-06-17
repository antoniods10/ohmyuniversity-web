import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ABOUT_ORG_STATS, APP_NAME } from '@shared/constants';
import { CardStatComponent } from '@ui/custom-card/card-variants.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-about-org',
  standalone: true,
  imports: [CommonModule, CardStatComponent, CustomButtonComponent, CustomTextComponent],
  templateUrl: './about-org.component.html',
})
export class AboutOrgComponent {
  readonly stats = ABOUT_ORG_STATS;
  readonly APP_NAME = APP_NAME;
}
