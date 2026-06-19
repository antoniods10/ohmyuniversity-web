import { Component, computed, signal } from '@angular/core';
import { DashboardContainerComponent } from '@ui/dashboard-container/dashboard-container.component';
import { DashboardHeaderComponent } from '@ui/dashboard-header/dashboard-header.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { MOTIVATIONAL_QUOTES } from '@shared/constants';

@Component({
  selector: 'app-dashboard-home-page',
  standalone: true,
  imports: [DashboardContainerComponent, DashboardHeaderComponent, CustomTextComponent],
  templateUrl: './home.page.html',
})
export class DashboardHomePage {
  readonly mockUserName = 'Marco';

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Buongiorno';
    if (hour >= 12 && hour < 18) return 'Buon pomeriggio';
    return 'Buonasera';
  });

  readonly quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}
