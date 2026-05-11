import { Component, input, output } from '@angular/core';
import { OrientationNavComponent } from '../../orientation-nav/orientation-nav.component';

@Component({
  selector: 'app-topic-corso',
  standalone: true,
  imports: [OrientationNavComponent],
  templateUrl: './topic-corso.component.html',
})
export class TopicCorsoComponent {
  readonly hasPrev = input.required<boolean>();
  readonly hasNext = input.required<boolean>();
  readonly prev = output<void>();
  readonly next = output<void>();
  readonly backToList = output<void>();

  readonly aree = [
    { label: 'Umanistica', emoji: '📚', esempi: 'Lettere, Filosofia, Storia, Lingue' },
    { label: 'Scientifica', emoji: '🔬', esempi: 'Biologia, Chimica, Fisica, Matematica' },
    {
      label: 'Ingegneria & Informatica',
      emoji: '💻',
      esempi: 'Informatica, Elettronica, Meccanica',
    },
    { label: 'Economica & Giuridica', emoji: '⚖️', esempi: 'Economia, Giurisprudenza, Management' },
    { label: 'Sanitaria', emoji: '🏥', esempi: 'Medicina, Infermieristica, Farmacia' },
    {
      label: 'Artistica & del Design',
      emoji: '🎨',
      esempi: 'Architettura, Design, DAMS, Belle Arti',
    },
  ];

  readonly consigli = [
    {
      titolo: 'Parti dalle materie che ami davvero',
      testo:
        'Non scegliere un corso perché "sbocca bene" se le materie ti annoiano. La motivazione intrinseca è il fattore numero uno nel completare gli studi nei tempi.',
    },
    {
      titolo: 'Considera la sede geografica',
      testo:
        'Studiare lontano da casa ha costi e benefici reali: indipendenza, rete di contatti più ampia, ma anche affitto, distanza dalla famiglia e maggiore autogestione richiesta.',
    },
    {
      titolo: 'Triennale vs magistrale',
      testo:
        'La triennale da sola apre già molte porte. Non è obbligatorio proseguire con la magistrale - dipende dal settore. Valuta entrambe le opzioni prima di scegliere il percorso.',
    },
    {
      titolo: 'Open day e visite in ateneo',
      testo:
        'Prima di iscriverti, vai a un open day. Parla con gli studenti del corso che ti interessa, non solo con i professori. Loro ti diranno la verità su carichi, esami e organizzazione.',
    },
  ];
}
