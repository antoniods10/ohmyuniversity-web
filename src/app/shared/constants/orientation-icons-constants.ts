import {
  LucideBookOpen,
  LucideZap,
  LucideMonitor,
  LucideBriefcase,
  LucideHeart,
  LucideLayers,
} from '@lucide/angular';
import { AreaEstesa } from '@types';

export const AREE_ESTESE: AreaEstesa[] = [
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

export const AREA_ICONS: Record<string, any> = {
  umanistica: LucideBookOpen,
  scientifica: LucideZap,
  ingegneria: LucideMonitor,
  economica: LucideBriefcase,
  sanitaria: LucideHeart,
  artistica: LucideLayers,
};
