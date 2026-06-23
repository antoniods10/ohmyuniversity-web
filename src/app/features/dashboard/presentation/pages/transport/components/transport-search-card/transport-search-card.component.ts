import {
  Component,
  input,
  signal,
  inject,
  computed,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomInputComponent } from '@ui/custom-input/custom-input.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import {
  LucideDynamicIcon,
  LucideSearch,
  LucideMapPin,
  LucideNavigation,
  LucideLocate,
} from '@lucide/angular';

@Component({
  selector: 'app-transport-search-card',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomTextComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './transport-search-card.component.html',
})
export class TransportSearchCardComponent implements OnInit, AfterViewInit {
  readonly universityName = input.required<string>();
  readonly universityAddress = input.required<string>();

  @ViewChild('fromInput') fromInput!: CustomInputComponent;
  @ViewChild('toInput') toInput!: CustomInputComponent;

  private readonly sanitizer = inject(DomSanitizer);

  readonly iconSearch = LucideSearch;
  readonly iconMapPin = LucideMapPin;
  readonly iconNavigation = LucideNavigation;
  readonly iconLocate = LucideLocate;

  fromValue = signal<string>('');
  toValue = signal<string>('');
  searching = signal<boolean>(false);
  locationLoading = signal<boolean>(false);

  private _confirmedFrom = signal<string>('');
  private _confirmedTo = signal<string>('');

  ngOnInit(): void {
    this._confirmedTo.set(this.universityAddress());
    this.toValue.set(this.universityAddress());
  }

  ngAfterViewInit(): void {
    this.toInput.writeValue(this.universityAddress());
    this.useMyLocation(true);
  }

  mapUrl = computed<SafeResourceUrl>(() => {
    const from = this._confirmedFrom();
    const to = this._confirmedTo();

    const url = from
      ? `https://maps.google.com/maps?saddr=${encodeURIComponent(from)}&daddr=${encodeURIComponent(to)}&output=embed`
      : `https://maps.google.com/maps?q=${encodeURIComponent(to)}&output=embed`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  onFromChange(val: string | number): void {
    this.fromValue.set(String(val));
  }

  onToChange(val: string | number): void {
    this.toValue.set(String(val));
  }

  onSearch(): void {
    if (!this.fromValue() || !this.toValue()) return;
    this.searching.set(true);
    this._confirmedFrom.set(this.fromValue());
    this._confirmedTo.set(this.toValue());
    this.searching.set(false);
  }

  useMyLocation(silent = false): void {
    if (!navigator.geolocation) return;

    this.locationLoading.set(true);

    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'it' } },
          );
          const data = await res.json();
          const address =
            data.display_name?.split(',').slice(0, 2).join(', ') ?? `${latitude}, ${longitude}`;
          this.fromValue.set(address);
          this._confirmedFrom.set(address);
          this.fromInput?.writeValue(address);
        } catch {
          const coords = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          this.fromValue.set(coords);
          this._confirmedFrom.set(coords);
          this.fromInput?.writeValue(coords);
        }

        this.locationLoading.set(false);
      },
      error => {
        this.locationLoading.set(false);
        if (!silent) {
          console.warn('Geolocalizzazione non disponibile:', error.message);
        }
      },
      { timeout: 8000, maximumAge: 60000 },
    );
  }
}
