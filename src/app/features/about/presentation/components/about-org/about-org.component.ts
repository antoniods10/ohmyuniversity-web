import { Component } from '@angular/core';

@Component({
  selector: 'app-about-org',
  standalone: true,
  templateUrl: './about-org.component.html',
})
export class AboutOrgComponent {
  readonly stats = [
    { value: '6', label: 'Contributori attivi' },
    { value: '100%', label: 'Open source' },
    { value: '1', label: 'Progetto attivo' },
    { value: '50+', label: 'Atenei supportati' },
  ];
}
