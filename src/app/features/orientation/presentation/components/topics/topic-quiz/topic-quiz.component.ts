import { Component, input, output } from '@angular/core';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';

export interface TestIngresso {
  ateneo: string;
  corso: string;
  tipo: string;
  argomenti: string[];
  link: string;
}

@Component({
  selector: 'app-topic-quiz',
  standalone: true,
  imports: [OrientationNavComponent],
  templateUrl: './topic-quiz.component.html',
})
export class TopicQuizComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly testsEsempio: TestIngresso[] = [
    {
      ateneo: 'Vari atenei',
      corso: 'Medicina e Chirurgia',
      tipo: 'TOLC-MED',
      argomenti: [
        'Biologia',
        'Chimica',
        'Fisica e Matematica',
        'Ragionamento logico',
        'Comprensione del testo',
      ],
      link: '#',
    },
    {
      ateneo: 'Vari atenei',
      corso: 'Ingegneria',
      tipo: 'TOLC-I',
      argomenti: ['Matematica', 'Logica', 'Scienze', 'Comprensione verbale'],
      link: '#',
    },
    {
      ateneo: 'Vari atenei',
      corso: 'Economia',
      tipo: 'TOLC-E',
      argomenti: ['Matematica', 'Comprensione verbale', 'Logica', 'Inglese'],
      link: '#',
    },
    {
      ateneo: 'Vari atenei',
      corso: 'Scienze (bio, chim, farm)',
      tipo: 'TOLC-S',
      argomenti: ['Biologia', 'Chimica', 'Matematica e Fisica', 'Ragionamento logico'],
      link: '#',
    },
  ];

  readonly consigli = [
    {
      titolo: 'Inizia almeno 3 mesi prima',
      testo:
        'I test TOLC si possono ripetere una volta al mese. Inizia a fare simulazioni con largo anticipo: il tempo è il tuo alleato principale.',
    },
    {
      titolo: 'Usa CISIA per le simulazioni ufficiali',
      testo:
        'Il consorzio CISIA mette a disposizione simulazioni gratuite dei TOLC sul loro sito ufficiale. Sono identiche al test reale per struttura e difficoltà.',
    },
    {
      titolo: 'Non trascurare la logica',
      testo:
        'La sezione di ragionamento logico è spesso quella che fa la differenza. Molti studenti la sottovalutano perché non è una materia scolastica classica - allenati con esercizi specifici.',
    },
  ];

  readonly autovalutazione = [
    {
      domanda: 'Ti piace risolvere problemi matematici?',
      rilevante: 'Ingegneria, Economia, Scienze',
    },
    {
      domanda: 'Ti appassiona il funzionamento del corpo umano?',
      rilevante: 'Medicina, Biologia, Farmacia',
    },
    {
      domanda: 'Ti piace scrivere e analizzare testi?',
      rilevante: 'Lettere, Giurisprudenza, Comunicazione',
    },
    { domanda: 'Ami costruire o progettare cose?', rilevante: 'Ingegneria, Architettura, Design' },
    {
      domanda: 'Ti interessano le dinamiche sociali ed economiche?',
      rilevante: 'Economia, Sociologia, Scienze Politiche',
    },
  ];
}
