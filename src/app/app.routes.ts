import { Routes } from '@angular/router';

// Public
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { HomePage } from './features/home/presentation/pages/home.page';
import { AboutPage } from './features/about/presentation/pages/about.page';
import { ContattiPage } from './features/contatti/presentation/pages/contatti.page';
import { PartnerPage } from './features/partner/presentation/pages/partner.page';

// Auth
import { LoginPage } from './features/auth/presentation/pages/login.page';

// Orientation
import { OrientationPage } from './features/orientation/presentation/pages/orientation.page';

// FAQ
import { FaqPage } from './features/faq/presentation/pages/faq/faq.page';
import { FaqBusinessPage } from './features/faq/presentation/pages/faq-business/faq-business.page';

// Business
import { PricingPage } from './features/pricing/presentation/pages/pricing.page';
import { BusinessOffertaPage } from './features/business/presentation/pages/business-offerta/business-offerta.page';
import { BusinessCollettiviPage } from './features/business/presentation/pages/business-collettivi/business-collettivi.page';
import { BusinessVisibilitaPage } from './features/business/presentation/pages/business-visibilita/business-visibilita.page';
import { BusinessRegistrazionePage } from './features/business/presentation/pages/business-registrazione/business-registrazione.page';
import { BusinessContattiPage } from './features/business/presentation/pages/business-contatti/business-contatti.page';

// Legal
import { PrivacyPolicyPage } from './features/legal/presentation/pages/privacy-policy/privacy-policy.page';
import { CookiePolicyPage } from './features/legal/presentation/pages/cookie-policy/cookie-policy.page';
import { TermsPage } from './features/legal/presentation/pages/terms-conditions/terms-conditions.page';

// Dashboard Layout
import { DashboardLayoutComponent } from './features/dashboard/presentation/layout/dashboard-layout.component';

// Dashboard Pages
import { DashboardHomePage } from './features/dashboard/presentation/pages/home/home.page';
import { CareerPage } from './features/dashboard/presentation/pages/career/career.page';
// import { CalendarioPage } from './features/dashboard/presentation/pages/calendario/calendario.page';
// import { EsamiPage } from './features/dashboard/presentation/pages/esami/esami.page';
// import { DocumentiPage } from './features/dashboard/presentation/pages/documenti/documenti.page';
// import { BorseStudioPage } from './features/dashboard/presentation/pages/borse-studio/borse-studio.page';
// import { TirociniPage } from './features/dashboard/presentation/pages/tirocini/tirocini.page';
// import { MessaggiPage } from './features/dashboard/presentation/pages/messaggi/messaggi.page';
// import { OrientamentoDashboardPage } from './features/dashboard/presentation/pages/orientamento/orientamento.page';
// import { ImpostazioniPage } from './features/dashboard/presentation/pages/impostazioni/impostazioni.page';
// import { ProfiloPage } from './features/dashboard/presentation/pages/profilo/profilo.page';

// Shared
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  // =============================================
  // Public Layout
  // =============================================
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      // Marketing / Landing
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'chi-siamo',
        component: AboutPage,
      },
      {
        path: 'contatti',
        component: ContattiPage,
      },
      {
        path: 'partner',
        component: PartnerPage,
      },

      // Auth
      {
        path: 'login',
        component: LoginPage,
      },

      // Orientamento (guest)
      {
        path: 'orientamento',
        component: OrientationPage,
      },

      // FAQ
      {
        path: 'faq',
        component: FaqPage,
      },
      {
        path: 'business/faq',
        component: FaqBusinessPage,
      },

      // Business (B2B)
      {
        path: 'business/prezzi',
        component: PricingPage,
      },
      {
        path: 'business/offerta',
        component: BusinessOffertaPage,
      },
      {
        path: 'business/collettivi',
        component: BusinessCollettiviPage,
      },
      {
        path: 'business/visibilita',
        component: BusinessVisibilitaPage,
      },
      {
        path: 'business/registrazione',
        component: BusinessRegistrazionePage,
      },
      {
        path: 'business/contatti',
        component: BusinessContattiPage,
      },

      // Legal
      {
        path: 'privacy-policy',
        component: PrivacyPolicyPage,
      },
      {
        path: 'cookie-policy',
        component: CookiePolicyPage,
      },
      {
        path: 'termini-condizioni',
        component: TermsPage,
      },
    ],
  },

  // =============================================
  // Dashboard
  // =============================================
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardHomePage,
      },
      {
         path: 'career',
         component: CareerPage,
      },
      {
        path: 'didattica',
        loadComponent: () => import('./features/dashboard/presentation/pages/didattica/didattica.page').then(m => m.DidatticaPage),
      },
      {
        path: 'sviluppi-futuri',
        loadComponent: () => import('./features/dashboard/presentation/pages/sviluppi-futuri/sviluppi-futuri.page').then(m => m.SviluppiFuturiPage),
      }
      // {
      //   path: 'calendario',
      //   component: CalendarioPage,
      // },
      // {
      //   path: 'esami',
      //   component: EsamiPage,
      // },
      // {
      //   path: 'documenti',
      //   component: DocumentiPage,
      // },
      // {
      //   path: 'borse-studio',
      //   component: BorseStudioPage,
      // },
      // {
      //   path: 'tirocini',
      //   component: TirociniPage,
      // },
      // {
      //   path: 'messaggi',
      //   component: MessaggiPage,
      // },
      // {
      //   path: 'impostazioni',
      //   component: ImpostazioniPage,
      // },
      // {
      //   path: 'profilo',
      //   component: ProfiloPage,
      // },
    ],
  },

  // =============================================
  // Wildcard — 404
  // =============================================
  {
    path: '**',
    component: NotFoundComponent,
  },
];
