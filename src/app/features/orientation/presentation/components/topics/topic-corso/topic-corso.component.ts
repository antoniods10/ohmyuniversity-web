import { Component, input, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';
import { CustomButtonComponent } from '@ui/custom-button/custom-button.component';
import { CustomBadgeComponent } from '@ui/custom-badge/custom-badge.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import {
  LucideDynamicIcon,
  LucideCircleCheck,
  LucideCheck,
  LucideChevronRight,
  LucideInfo,
  LucideBookOpen,
  LucideZap,
  LucideMonitor,
  LucideBriefcase,
  LucideHeart,
  LucideLayers,
} from '@lucide/angular';
import { ToastService } from '@ui/custom-toast/toast.service';
import { CORSO_CONSIGLI, ORIENTATION_TOPICS } from '@constants';
import { InlineOption, AreaEstesa } from '@types';
import {
  getIconBgClass,
  getIconColorClass,
  getLabelColorClass,
  getVariantBorderClass,
} from '@shared/utils/orientation.utils';

const AREE_ESTESE: AreaEstesa[] = [
  {
    value: 'umanistica',
    label: 'Umanistica',
    icon: LucideBookOpen,
    iconVariant: 'warning',
    descrizione:
      "Studia il pensiero, il linguaggio e la storia dell'umanità. Forma capacità critiche, comunicative e interpretative molto richieste in ambiti come editoria, comunicazione, cultura e pubblica amministrazione.",
    facolta: [
      'Lettere e Filosofia',
      'Lingue e Letterature Straniere',
      'Storia',
      'Scienze della Comunicazione',
      'Beni Culturali',
      'Pedagogia',
    ],
  },
  {
    value: 'scientifica',
    label: 'Scientifica',
    icon: LucideZap,
    iconVariant: 'info',
    descrizione:
      'Indaga i fenomeni naturali attraverso il metodo sperimentale. Richiede solide basi matematiche e logiche. Sbocca in ricerca, industria farmaceutica, ambiente e tecnologia.',
    facolta: [
      'Matematica',
      'Fisica',
      'Chimica',
      'Biologia',
      'Scienze Naturali',
      'Scienze Geologiche',
      'Biotecnologie',
    ],
  },
  {
    value: 'ingegneria',
    label: 'Ingegneria & Informatica',
    icon: LucideMonitor,
    iconVariant: 'primary',
    descrizione:
      "Progetta sistemi, processi e soluzioni tecnologiche. È l'area con i tassi di occupazione più alti in Italia. Richiede attitudine al problem solving e buone basi matematiche.",
    facolta: [
      'Ingegneria Informatica',
      'Ingegneria Elettronica',
      'Ingegneria Meccanica',
      'Ingegneria Civile',
      'Informatica',
      'Ingegneria Gestionale',
      'Ingegneria Biomedica',
    ],
  },
  {
    value: 'economica',
    label: 'Economica & Giuridica',
    icon: LucideBriefcase,
    iconVariant: 'success',
    descrizione:
      'Analizza mercati, organizzazioni e sistemi normativi. Forma profili versatili richiesti in aziende, studi professionali, banche e pubblica amministrazione.',
    facolta: [
      'Economia e Commercio',
      'Giurisprudenza',
      'Scienze Politiche',
      'Management',
      'Economia Aziendale',
      'Finanza',
      'Relazioni Internazionali',
    ],
  },
  {
    value: 'sanitaria',
    label: 'Sanitaria',
    icon: LucideHeart,
    iconVariant: 'error',
    descrizione:
      'Si occupa della salute umana a 360 gradi, dalla diagnosi alla cura, dalla prevenzione alla riabilitazione. Molti corsi sono a numero chiuso e richiedono il superamento del TOLC-MED.',
    facolta: [
      'Medicina e Chirurgia',
      'Farmacia',
      'Infermieristica',
      'Fisioterapia',
      'Odontoiatria',
      'Veterinaria',
      'Scienze Motorie',
    ],
  },
  {
    value: 'artistica',
    label: 'Artistica & del Design',
    icon: LucideLayers,
    iconVariant: 'secondary',
    descrizione:
      'Combina creatività e tecnica per progettare spazi, oggetti, esperienze visive e digitali. Richiede portfolio e spesso si affianca ad Accademie di Belle Arti e istituti AFAM.',
    facolta: [
      'Architettura',
      'Design del Prodotto',
      'Design della Comunicazione',
      'DAMS',
      'Belle Arti',
      'Moda e Costume',
      'Scenografia',
    ],
  },
];

const AREA_ICONS: Record<string, any> = {
  umanistica: LucideBookOpen,
  scientifica: LucideZap,
  ingegneria: LucideMonitor,
  economica: LucideBriefcase,
  sanitaria: LucideHeart,
  artistica: LucideLayers,
};

@Component({
  selector: 'app-topic-corso',
  standalone: true,
  imports: [
    CommonModule,
    LucideDynamicIcon,
    OrientationNavComponent,
    CustomTextComponent,
    CustomButtonComponent,
    CustomBadgeComponent,
    CardStatusComponent,
    CustomLinkComponent,
  ],
  templateUrl: './topic-corso.component.html',
})
export class TopicCorsoComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  private readonly toast = inject(ToastService);

  readonly iconCheck = LucideCircleCheck;
  readonly iconSelected = LucideCheck;
  readonly iconChevron = LucideChevronRight;
  readonly iconInfo = LucideInfo;

  readonly areeEstese = AREE_ESTESE;
  readonly consigli = CORSO_CONSIGLI;
  readonly question = ORIENTATION_TOPICS.find(t => t.id === 'corso')!.questions[0];

  readonly expandedArea = signal<string | null>(null);
  readonly selectedValue = signal<string | null>(null);

  readonly getIconBgClass = getIconBgClass;
  readonly getIconColorClass = getIconColorClass;
  readonly getLabelColorClass = getLabelColorClass;
  readonly getBorderClass = getVariantBorderClass;

  scrollToQuestion(): void {
    document
      .getElementById('domanda-corso')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleArea(value: string): void {
    this.expandedArea.set(this.expandedArea() === value ? null : value);
  }

  isExpanded(value: string): boolean {
    return this.expandedArea() === value;
  }

  isSelected(value: string): boolean {
    return this.selectedValue() === value;
  }

  getAreaIcon(value: string): any {
    return AREA_ICONS[value] ?? null;
  }

  getLabelClean(option: InlineOption): string {
    return option.label.replace(/^\S+\s/, '');
  }

  onSelect(value: string): void {
    const isNew = this.selectedValue() !== value;
    this.selectedValue.set(value);
    if (isNew) {
      const label = this.getLabelClean(
        this.question.options!.find((o: InlineOption) => o.value === value)!,
      );
      this.toast.success(`Area selezionata: ${label}`, { duration: 3000 });
    }
  }
}
