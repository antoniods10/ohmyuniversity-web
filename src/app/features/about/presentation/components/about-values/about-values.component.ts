import { Component } from '@angular/core';
import { ABOUT_VALUES } from '@constants';

@Component({
  selector: 'app-about-values',
  standalone: true,
  templateUrl: './about-values.component.html',
})
export class AboutValuesComponent {
  readonly values = ABOUT_VALUES;
}
