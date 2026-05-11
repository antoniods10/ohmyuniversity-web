import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home
  {
    path: '',
    loadComponent: () =>
      import('./features/home/presentation/pages/home.page').then(m => m.HomePage),
  },

  // Auth - Login
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/presentation/pages/login.page').then(m => m.LoginPage),
  },

  // Chi Siamo
  {
    path: 'chi-siamo',
    loadComponent: () =>
      import('./features/about/presentation/pages/about.page').then(m => m.AboutPage),
  },

  // Pre-Orientamento (guest)
  {
    path: 'orientamento',
    loadComponent: () =>
      import('./features/orientation/presentation/pages/orientation.page').then(
        m => m.OrientationPage,
      ),
  },

  // Contatti
  {
    path: 'contatti',
    loadComponent: () =>
      import('./features/contatti/presentation/pages/contatti.page').then(m => m.ContattiPage),
  },

  // Partner (landing B2B)
  {
    path: 'partner',
    loadComponent: () =>
      import('./features/partner/presentation/pages/partner.page').then(m => m.PartnerPage),
  },

  // FAQ
  {
    path: 'faq',
    loadComponent: () =>
      import('./features/faq/presentation/pages/faq/faq.page').then(m => m.FaqPage),
  },
  {
    path: 'business/faq',
    loadComponent: () =>
      import('./features/faq/presentation/pages/faq-business/faq-business.page').then(
        m => m.FaqBusinessPage,
      ),
  },

  // Piani e prezzi
  {
    path: 'business/prezzi',
    loadComponent: () =>
      import('./features/pricing/presentation/pages/pricing.page').then(m => m.PricingPage),
  },

  // Business
  {
    path: 'business/offerta',
    loadComponent: () =>
      import('./features/business/presentation/pages/business-offerta/business-offerta.page').then(
        m => m.BusinessOffertaPage,
      ),
  },
  {
    path: 'business/collettivi',
    loadComponent: () =>
      import('./features/business/presentation/pages/business-collettivi/business-collettivi.page').then(
        m => m.BusinessCollettiviPage,
      ),
  },
  {
    path: 'business/visibilita',
    loadComponent: () =>
      import('./features/business/presentation/pages/business-visibilita/business-visibilita.page').then(
        m => m.BusinessVisibilitaPage,
      ),
  },
  {
    path: 'business/registrazione',
    loadComponent: () =>
      import('./features/business/presentation/pages/business-registrazione/business-registrazione.page').then(
        m => m.BusinessRegistrazionePage,
      ),
  },
  {
    path: 'business/contatti',
    loadComponent: () =>
      import('./features/business/presentation/pages/business-contatti/business-contatti.page').then(
        m => m.BusinessContattiPage,
      ),
  },

  // Legal
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./features/legal/presentation/pages/privacy-policy/privacy-policy.page').then(
        m => m.PrivacyPolicyPage,
      ),
  },
  {
    path: 'cookie-policy',
    loadComponent: () =>
      import('./features/legal/presentation/pages/cookie-policy/cookie-policy.page').then(
        m => m.CookiePolicyPage,
      ),
  },
  {
    path: 'termini-condizioni',
    loadComponent: () =>
      import('./features/legal/presentation/pages/terms-conditions/terms-conditions.page').then(
        m => m.TermsPage,
      ),
  },

  // Dashboard - (auth)
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/presentation/pages/dashboard.page').then(m => m.DashboardPage),
    // canActivate: [authGuard],
  },

  // Wildcard - 404
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
