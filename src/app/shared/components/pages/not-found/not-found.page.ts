import { Component, signal, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.page.html',
})
export class NotFoundPage {
  private readonly router = inject(Router);

  readonly countdown = signal(10);

  readonly isDashboard = signal(this.router.url.startsWith('/dashboard'));

  constructor() {
    effect(onCleanup => {
      if (this.isDashboard()) return;

      const interval = setInterval(() => {
        this.countdown.update(n => {
          if (n <= 1) {
            clearInterval(interval);
            this.router.navigate(['/']);
          }
          return n - 1;
        });
      }, 1000);

      onCleanup(() => clearInterval(interval));
    });
  }
}
