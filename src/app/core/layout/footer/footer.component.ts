import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getCurrentYear } from '../../../shared/utils/date.utils';
import { APP_LOGO, APP_NAME, ORGANIZATION_NAME } from '@constants';

interface FooterLink {
  label: string;
  path: string;
  external?: boolean;
  fragment?: string;
}

interface University {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly currentYear = getCurrentYear();
  readonly vatNumber = 'IT00000000000';
  readonly isDashboard = input<boolean>(false);
  readonly APP_NAME = APP_NAME;
  readonly APP_LOGO = APP_LOGO;
  readonly ORGANIZATION_NAME = ORGANIZATION_NAME;

  readonly universities: University[] = [
    {
      name: 'Università di Bologna',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Logo_Università_di_Bologna.svg/200px-Logo_Università_di_Bologna.svg.png',
    },
    {
      name: 'Sapienza Università di Roma',
      logo: 'https://upload.wikimedia.org/wikipedia/it/thumb/6/68/Logo_Sapienza.svg/200px-Logo_Sapienza.svg.png',
    },
    {
      name: 'Politecnico di Milano',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Politecnico_di_Milano_Logo.svg/200px-Politecnico_di_Milano_Logo.svg.png',
    },
    {
      name: 'Università di Padova',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Unipd-logo.png/200px-Unipd-logo.png',
    },
    {
      name: 'Università di Napoli Federico II',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Federico_II_University_logo.svg/200px-Federico_II_University_logo.svg.png',
    },
    {
      name: 'Università di Milano',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Unimi_logo.png/200px-Unimi_logo.png',
    },
    {
      name: 'Università di Torino',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Logo-unito.png/200px-Logo-unito.png',
    },
    {
      name: 'Università di Firenze',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Unifi_logo.svg/200px-Unifi_logo.svg.png',
    },
    {
      name: 'Università di Pisa',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Logo_Università_di_Pisa.svg/200px-Logo_Università_di_Pisa.svg.png',
    },
    {
      name: 'Politecnico di Torino',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Politecnico_di_Torino_-_Logo.svg/200px-Politecnico_di_Torino_-_Logo.svg.png',
    },
    {
      name: 'Università di Bari',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Logo_Università_di_Bari.svg/200px-Logo_Università_di_Bari.svg.png',
    },
    {
      name: 'Università del Molise',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Logo_Unimol.svg/200px-Logo_Unimol.svg.png',
    },
    {
      name: 'Università di Catania',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Logo_Università_di_Catania.svg/200px-Logo_Università_di_Catania.svg.png',
    },
    {
      name: 'Università di Palermo',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Logo_Università_degli_Studi_di_Palermo.svg/200px-Logo_Università_degli_Studi_di_Palermo.svg.png',
    },
    {
      name: 'Università di Genova',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Logo_Università_di_Genova.svg/200px-Logo_Università_di_Genova.svg.png',
    },
  ];

  readonly navLinks: FooterLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Chi Siamo', path: '/chi-siamo' },
    { label: 'Orientamento', path: '/orientamento' },
    { label: 'Accedi', path: '/login' },
    { label: 'FAQ', path: '/faq' },
  ];

  readonly businessLinks: FooterLink[] = [
    { label: 'Cosa offriamo alle aziende', path: '/business/offerta' },
    { label: 'Cosa offriamo ai collettivi', path: '/business/collettivi' },
    { label: 'Come funziona la visibilità', path: '/business/visibilita' },
    { label: 'Come creare un profilo', path: '/business/registrazione' },
    { label: 'Piani e prezzi', path: '/business/prezzi' },
    { label: 'Contatta il team commerciale', path: '/business/contatti' },
    { label: 'FAQ Business', path: '/business/faq' },
  ];

  readonly legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Cookie Policy', path: '/cookie-policy' },
    { label: 'Termini & Condizioni', path: '/termini-condizioni' },
  ];

  readonly faqLinks = [
    { label: 'Come funziona OhMyUniversity?', path: '/faq', fragment: 'funzionamento' },
    { label: 'Come accedo con il mio ateneo?', path: '/faq', fragment: 'accesso' },
    { label: 'I miei dati sono al sicuro?', path: '/faq', fragment: 'sicurezza' },
    { label: 'Come segnalo un problema?', path: '/faq', fragment: 'supporto' },
  ];

  readonly socials = [
    {
      label: 'GitHub',
      url: 'https://github.com/ohmyopensource',
      icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    },
    {
      label: 'Instagram',
      url: 'https://instagram.com',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      label: 'X / Twitter',
      url: 'https://x.com',
      icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
  ];

  readonly supportLinks = [
    { label: 'PayPal', url: 'https://paypal.me', color: 'bg-[#003087] hover:bg-[#002070]' },
    { label: 'Ko-fi', url: 'https://ko-fi.com', color: 'bg-[#FF5E5B] hover:bg-[#e54e4b]' },
    {
      label: 'GitHub Sponsors',
      url: 'https://github.com/sponsors',
      color: 'bg-gray-900 hover:bg-gray-800',
    },
  ];
}
