export interface CareerData {
  arithmeticAvg: number;
  weightedAvg: number;
  graduationBase: number;
  honors: number;
  obtainedCfu: number;
  totalCfu: number;
  currentSemesterExams: {
    name: string;
    cfu: number;
    passed: boolean;
  }[];
}

export const MOCK_CAREER_DATA: CareerData = {
  arithmeticAvg: 26.8,
  weightedAvg: 27.5,
  graduationBase: 91,
  honors: 3,
  obtainedCfu: 142,
  totalCfu: 180,
  currentSemesterExams: [
    { name: 'Analisi Matematica II', cfu: 9, passed: false },
    { name: 'Fisica II', cfu: 6, passed: true },
    { name: 'Programmazione II', cfu: 9, passed: false },
    { name: 'Algoritmi e Strutture Dati', cfu: 6, passed: true },
  ],
};
