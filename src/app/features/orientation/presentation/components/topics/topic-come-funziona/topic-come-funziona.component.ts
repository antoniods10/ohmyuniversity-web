import { Component, input, output } from '@angular/core';
import { CfuChartComponent } from '../../charts/cfu-chart/cfu-chart.component';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';

@Component({
  selector: 'app-topic-come-funziona',
  standalone: true,
  imports: [OrientationNavComponent, CfuChartComponent],
  templateUrl: './topic-come-funziona.component.html',
})
export class TopicComeFunzionaComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly differenze = [
    {
      aspetto: 'Frequenza',
      scuola: 'Obbligatoria, controllata ogni giorno',
      universita: 'Spesso facoltativa - sei tu a scegliere',
    },
    {
      aspetto: 'Verifiche',
      scuola: "Continue, distribuite durante l'anno",
      universita: "Concentrate nelle sessioni d'esame",
    },
    {
      aspetto: 'Supporto',
      scuola: 'Prof. seguono ogni studente individualmente',
      universita: 'Autonomia totale - chiedi tu se hai bisogno',
    },
    {
      aspetto: 'Ritmo',
      scuola: "Scandito dall'istituto, poco flessibile",
      universita: 'Gestisci tu il piano e i tempi',
    },
  ];

  readonly tipiEsame = [
    {
      tipo: 'Scritto',
      descrizione:
        'Svolto in aula in un tempo definito. Può essere a risposta aperta, a scelta multipla o misto.',
      icon: '✍️',
    },
    {
      tipo: 'Orale',
      descrizione:
        'Colloquio con il docente. Valuta la comprensione profonda degli argomenti, non solo la memorizzazione.',
      icon: '🎤',
    },
    {
      tipo: 'Scritto + Orale',
      descrizione:
        "Prima si supera lo scritto (spesso con voto minimo), poi si sostiene l'orale per definire il voto finale.",
      icon: '📋',
    },
    {
      tipo: 'Progetto / Elaborato',
      descrizione:
        'Comune nei corsi tecnici e del design. Si consegna un elaborato e spesso lo si discute davanti alla commissione.',
      icon: '📁',
    },
  ];

  readonly sessioniInfo = [
    {
      label: 'Sessione invernale',
      periodo: 'Gennaio – Febbraio',
      note: 'Esami del primo semestre',
    },
    { label: 'Sessione estiva', periodo: 'Giugno – Luglio', note: 'Esami del secondo semestre' },
    { label: 'Sessione autunnale', periodo: 'Settembre', note: 'Recupero e straordinari' },
  ];
}
