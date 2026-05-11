import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';

export interface Errore {
  titolo: string;
  perche: string;
  soluzione: string;
  emoji: string;
}

@Component({
  selector: 'app-topic-errori',
  standalone: true,
  imports: [OrientationNavComponent, RouterLink],
  templateUrl: './topic-errori.component.html',
})
export class TopicErroriComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly errori: Errore[] = [
    {
      emoji: '👗',
      titolo: 'Scegliere per moda',
      perche:
        'Psicologia, Marketing, Criminologia - ogni anno ci sono corsi "di tendenza" che attirano migliaia di iscritti. La domanda è: ti piace davvero quella materia, o stai seguendo un trend?',
      soluzione:
        'Fai una settimana di lezioni aperte (molti atenei le offrono) prima di iscriverti. Se le lezioni ti annoiano già al primo giorno, cambia rotta.',
    },
    {
      emoji: '👫',
      titolo: 'Seguire gli amici',
      perche:
        "Iscriversi dove va il gruppo di amici sembra rassicurante. Ma dopo 6 mesi, se il corso non ti piace, l'amicizia non basta come motivazione per alzarsi la mattina e studiare.",
      soluzione:
        'Valuta separatamente cosa vorresti fare tu. Puoi sempre restare in contatto con gli amici anche studiando in città diverse.',
    },
    {
      emoji: '➗',
      titolo: 'Sottovalutare matematica e teoria',
      perche:
        'Molti si iscrivono a Economia, Informatica o Ingegneria pensando "non mi piaceva al liceo ma ora sarà diverso". Di solito non è diverso - anzi, il livello sale.',
      soluzione:
        'Prima di iscriverti, guarda i programmi del primo anno. Se vedi Analisi Matematica, Fisica o Statistica, assicurati di avere le basi - o preparati a costruirle prima.',
    },
    {
      emoji: '📋',
      titolo: 'Non informarsi sugli esami',
      perche:
        'Scoprire a novembre che il tuo corso ha 8 esami scritti nel primo semestre, tutti con propedeuticità obbligatorie, è un brutto momento per sapere una cosa del genere.',
      soluzione:
        'Prima di iscriverti, leggi il piano di studi completo. Cerca le recensioni degli esami su Studentville, UniWiki o nei gruppi Telegram del corso. Chiedi agli studenti del secondo anno.',
    },
    {
      emoji: '📍',
      titolo: 'Ignorare il fattore sede',
      perche:
        'Scegliere un corso solo perché è "il migliore in classifica" senza considerare i costi di vita, la lontananza dalla famiglia e la qualità dei servizi locali è un errore comune.',
      soluzione:
        'Valuta il costo totale (affitto + vitto + trasporti) e chiediti se reggi mentalmente la distanza. Un ateneo leggermente meno quotato ma più accessibile può darti un risultato migliore.',
    },
    {
      emoji: '⏳',
      titolo: 'Non considerare i tempi reali di laurea',
      perche:
        'In Italia la media effettiva di completamento di una triennale è 4,2 anni, non 3. Fuori corso si ritrovano studenti motivati che semplicemente non hanno gestito bene il carico.',
      soluzione:
        "Pianifica da subito. Già dal secondo semestre del primo anno dovresti avere un'idea di quanti esami stai riuscendo a sostenere a sessione. Aggiusta il ritmo prima che diventi un problema cronico.",
    },
  ];
}
