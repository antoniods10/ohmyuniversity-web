import { LivingCostItem, Consiglio } from '@types';

/** Monthly living cost breakdown for a student living away from home */
export const BUDGET_LIVING_COSTS: LivingCostItem[] = [
  { voce: 'Affitto camera singola (media nazionale)', importo: '400-600 €/mese' },
  { voce: 'Spesa alimentare', importo: '150-250 €/mese' },
  { voce: 'Utenze (quota parte)', importo: '50-80 €/mese' },
  { voce: 'Trasporti', importo: '30-60 €/mese' },
  { voce: 'Totale stimato', importo: '630-990 €/mese' },
];

/** Practical tips for managing a student budget */
export const BUDGET_TIPS: Consiglio[] = [
  {
    titolo: 'Tieni traccia delle spese dal primo mese',
    testo:
      "Usa un foglio o un'app per annotare ogni uscita. Chi sa dove vanno i soldi può tagliare il superfluo, chi non lo sa finisce i soldi senza capire perché.",
  },
  {
    titolo: 'Separa le spese fisse da quelle variabili',
    testo:
      'Affitto, utenze e abbonamenti sono fissi: devi averli coperti prima di tutto. Le spese variabili (cibo fuori, svago) sono quelle su cui puoi agire.',
  },
  {
    titolo: 'Chiedi sempre lo sconto studenti',
    testo:
      'Trasporti, musei, software, cinema, palestre: moltissimi servizi hanno tariffe agevolate per gli universitari. Basta avere il badge o il certificato di iscrizione.',
  },
];
