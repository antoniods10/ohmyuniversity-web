import {
  GithubIconComponent,
  InstagramIconComponent,
  LinkedinIconComponent,
  XIconComponent,
  PaypalIconComponent,
  KofiIconComponent,
} from '@shared/icons';
import { FooterLink, UniversityFooter, SocialLink, SupportLink } from '@shared/types';

export const FOOTER_EMAIL = 'hello@ohmyuniversity.it';
export const FOOTER_GITHUB_ORG_URL = 'https://github.com/ohmyopensource';
export const FOOTER_VAT_NUMBER = 'IT00000000000';

export const FOOTER_NAV_LINKS: FooterLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Chi Siamo', path: '/chi-siamo' },
  { label: 'Orientamento', path: '/orientamento' },
  { label: 'Accedi', path: '/login' },
  { label: 'FAQ', path: '/faq' },
];

export const FOOTER_BUSINESS_LINKS: FooterLink[] = [
  { label: 'Cosa offriamo alle aziende', path: '/business/offerta' },
  { label: 'Cosa offriamo ai collettivi', path: '/business/collettivi' },
  { label: 'Come funziona la visibilità', path: '/business/visibilita' },
  { label: 'Come creare un profilo', path: '/business/registrazione' },
  { label: 'Piani e prezzi', path: '/business/prezzi' },
  { label: 'Contatta il team commerciale', path: '/business/contatti' },
  { label: 'FAQ Business', path: '/business/faq' },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Cookie Policy', path: '/cookie-policy' },
  { label: 'Termini & Condizioni', path: '/termini-condizioni' },
];

export const FOOTER_FAQ_LINKS = [
  { label: 'Come funziona OhMyUniversity?', path: '/faq', fragment: 'funzionamento' },
  { label: 'Come accedo con il mio ateneo?', path: '/faq', fragment: 'accesso' },
  { label: 'I miei dati sono al sicuro?', path: '/faq', fragment: 'sicurezza' },
  { label: 'Come segnalo un problema?', path: '/faq', fragment: 'supporto' },
];

export const FOOTER_SOCIALS: SocialLink[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/ohmyopensource',
    iconComponent: GithubIconComponent,
    colorForce:
      '[&_.card]:bg-[#080808]! [&_.card]:hover:bg-[#1a1a1a]! [&_.card]:text-white! [&_.card]:border-none!',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com',
    iconComponent: InstagramIconComponent,
    colorForce:
      '[&_.card]:bg-gradient-to-br! [&_.card]:from-[#405DE6]! [&_.card]:via-[#C13584]! [&_.card]:to-[#FCAF45]! [&_.card]:text-white! [&_.card]:border-none!',
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com',
    iconComponent: LinkedinIconComponent,
    colorForce:
      '[&_.card]:bg-[#0A66C2]! [&_.card]:hover:bg-[#084e94]! [&_.card]:text-white! [&_.card]:border-none!',
  },
  {
    label: 'X / Twitter',
    url: 'https://x.com',
    iconComponent: XIconComponent,
    colorForce:
      '[&_.card]:bg-black! [&_.card]:hover:bg-gray-800! [&_.card]:text-white! [&_.card]:border-none!',
  },
];

export const FOOTER_SUPPORT_LINKS: SupportLink[] = [
  {
    label: 'PayPal',
    url: 'https://paypal.me',
    iconComponent: PaypalIconComponent,
    colorForce:
      '[&_.card]:bg-[#082F94]! [&_.card]:hover:bg-[#061f63]! [&_.card]:text-white! [&_.card]:border-none!',
  },
  {
    label: 'Ko-fi',
    url: 'https://ko-fi.com',
    iconComponent: KofiIconComponent,
    colorForce:
      '[&_.card]:bg-[#FF6360]! [&_.card]:hover:bg-[#e8514e]! [&_.card]:text-white! [&_.card]:border-none!',
  },
  {
    label: 'GitHub Sponsors',
    url: 'https://github.com/sponsors',
    iconComponent: GithubIconComponent,
    colorForce:
      '[&_.card]:bg-[#080808]! [&_.card]:hover:bg-[#1a1a1a]! [&_.card]:text-white! [&_.card]:border-none!',
  },
];

export const FOOTER_UNIVERSITIES: UniversityFooter[] = [
  {
    name: 'Università di Bologna',
    logo: '/universities-svg/unibo.svg',
  },
  {
    name: 'Sapienza Università di Roma',
    logo: '/universities-svg/uniro1.svg',
  },
  {
    name: 'Politecnico di Milano',
    logo: '/universities-svg/polimi.svg',
  },
  {
    name: 'Università di Padova',
    logo: '/universities-svg/unipd.svg',
  },
  {
    name: 'Università di Napoli Federico II',
    logo: '/universities-svg/federico_na.svg',
  },
  {
    name: 'Università di Milano',
    logo: '/universities-svg/unimi.svg',
  },
  {
    name: 'Università di Torino',
    logo: '/universities-svg/unito.svg',
  },
  {
    name: 'Università di Firenze',
    logo: '/universities-svg/unifi.svg',
  },
  {
    name: 'Università di Pisa',
    logo: '/universities-svg/unipi.svg',
  },
  {
    name: 'Politecnico di Torino',
    logo: '/universities-svg/polito.svg',
  },
  {
    name: 'Università di Bari',
    logo: '/universities-svg/uniba.svg',
  },
  {
    name: 'Università del Molise',
    logo: '/universities-svg/unimol.svg',
  },
  {
    name: 'Università di Catania',
    logo: '/universities-svg/unict.svg',
  },
  {
    name: 'Università di Palermo',
    logo: '/universities-svg/unipa.svg',
  },
  {
    name: 'Università di Genova',
    logo: '/universities-svg/unige.svg',
  },
];
