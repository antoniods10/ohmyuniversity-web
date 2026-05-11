import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  initials: string;
  role: string;
  bio: string;
}

@Component({
  selector: 'app-about-team',
  standalone: true,
  templateUrl: './about-team.component.html',
})
export class AboutTeamComponent {
  readonly teamMembers: TeamMember[] = [
    {
      name: 'Luca',
      initials: 'L',
      role: 'Product Owner & Founder',
      bio: "Ha avuto l'idea di OhMyUniversity dopo anni di frustrazione con i portali universitari. Coordina la visione del prodotto e il rapporto con la community open source.",
    },
    {
      name: 'Francesco',
      initials: 'F',
      role: 'Full Stack Developer',
      bio: "Appassionato di architetture pulite e codice manutenibile. Lavora sul backend e sull'integrazione con i sistemi SSO degli atenei italiani.",
    },
    {
      name: 'Luca',
      initials: 'L',
      role: 'Frontend Developer',
      bio: "Specializzato in Angular e UX. Si assicura che ogni interazione sia fluida e accessibile, con un occhio di riguardo per l'esperienza mobile.",
    },
    {
      name: 'Vittorio',
      initials: 'V',
      role: 'Backend Developer',
      bio: "Esperto di API Gateway e sistemi distribuiti. Progetta l'infrastruttura che permette a OhMyUniversity di scalare su decine di atenei.",
    },
    {
      name: 'Antonio',
      initials: 'A',
      role: 'DevOps & Infrastructure',
      bio: 'Gestisce pipeline CI/CD, deployment e monitoring. Garantisce il 98% di uptime che promettiamo agli studenti.',
    },
    {
      name: 'Alessio',
      initials: 'Al',
      role: 'UI/UX Designer',
      bio: 'Trasforma i requisiti in interfacce intuitive. Ha ridisegnato il modo in cui gli studenti interagiscono con i dati universitari.',
    },
  ];
}
