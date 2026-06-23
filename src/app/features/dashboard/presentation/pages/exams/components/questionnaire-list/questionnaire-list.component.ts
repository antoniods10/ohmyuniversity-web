import { Component, inject, OnInit, signal, computed } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideClipboardList,
  LucideClipboardCheck,
  LucideClock,
  LucideInfo,
  LucideExternalLink,
  LucideTriangleAlert,
} from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CarrieraFacade } from 'src/app/features/dashboard/application/facades/carriera.facade';
import { QuestionarioEsame } from 'src/app/features/dashboard/domain/models/questionari.model';
import { ToastService } from '@ui/custom-toast/toast.service';

@Component({
  selector: 'app-questionnaire-list',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomBadgeComponent,
    CustomButtonComponent,
    CardStatusComponent,
    LucideDynamicIcon,
  ],
  templateUrl: './questionnaire-list.component.html',
})
export class QuestionnaireListComponent implements OnInit {
  private readonly carriera = inject(CarrieraFacade);
  private readonly toast = inject(ToastService);

  readonly iconClipboard = LucideClipboardList;
  readonly iconClipboardDone = LucideClipboardCheck;
  readonly iconClock = LucideClock;
  readonly iconInfo = LucideInfo;
  readonly iconExternal = LucideExternalLink;
  readonly lucideAlertTriangle = LucideTriangleAlert;

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly daCompilare = signal<QuestionarioEsame[]>([]);
  readonly compilati = signal<QuestionarioEsame[]>([]);

  ngOnInit(): void {
    this.carriera.getQuestionari().subscribe({
      next: response => {
        this.daCompilare.set(response.daCompilare);
        this.compilati.set(response.compilati);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  onCompila(adsceId: number): void {
    this.toast.show('La compilazione diretta dei questionari sarà disponibile a breve.', 'warning');
  }

  statoLabel(statoLink: number): string {
    const map: Record<number, string> = {
      2: 'Alcuni da compilare',
      3: 'Da compilare',
    };
    return map[statoLink] ?? 'Da compilare';
  }
}
