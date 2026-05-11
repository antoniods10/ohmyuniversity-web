import { Component, signal, effect } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  readonly countdown = signal(10);

  private readonly timer = effect(() => {
    const interval = setInterval(() => {
      this.countdown.update(n => {
        if (n <= 1) {
          clearInterval(interval);
          window.location.href = '/';
        }
        return n - 1;
      });
    }, 1000);
  });
}
