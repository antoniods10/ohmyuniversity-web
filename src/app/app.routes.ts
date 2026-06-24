import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
import { DashboardHomePage } from './features/dashboard/presentation/pages/home/pages/home.page';
import { CareerPage } from './features/dashboard/presentation/pages/career/pages/career.page';
import { ExamsPage } from './features/dashboard/presentation/pages/exams/pages/exams.page';
import { CalendarPage } from './features/dashboard/presentation/pages/calendar/pages/calendar.page';
import { SchedulePage } from './features/dashboard/presentation/pages/schedule/pages/schedule.page';

// =============================================
import { SviluppiFuturiPage } from './features/dashboard/presentation/pages/sviluppi-futuri/sviluppi-futuri.page';

// =============================================
import { ChatPage } from './features/dashboard/presentation/pages/chat/chat.page';

// =============================================
import { TransportPage } from './features/dashboard/presentation/pages/transport/pages/transport.page';
import { ClassroomsPage } from './features/dashboard/presentation/pages/classrooms/pages/classrooms.page';

// =============================================
import { PortalsPage } from './features/dashboard/presentation/pages/portals/portals.page';

// =============================================
import { UniversityPartnerPage } from './features/dashboard/presentation/pages/university-partner/university-partner.page';
import { UniversityContactsPage } from './features/dashboard/presentation/pages/university-contacts/university-contacts.page';
import { SecretariatPage } from './features/dashboard/presentation/pages/secretariat/pages/secretariat.page';
import { SettingsPage } from './features/dashboard/presentation/pages/settings/settings.page';
import { ProfiloPage } from './features/dashboard/presentation/pages/profilo/pages/profilo.page';

// Shared
import { NotFoundPage } from './shared/components/pages/not-found/not-found.page';
import { carrieraGuard } from './core/guards/carriera.guard';

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
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardHomePage,
      },
      { path: 'carriera', component: CareerPage, canActivate: [carrieraGuard] },
      { path: 'appelli', component: ExamsPage, canActivate: [carrieraGuard] },
      {
        path: 'agenda',
        component: CalendarPage,
      },
      {
        path: 'orario-lezioni',
        component: SchedulePage,
      },

      // ============================
      {
        path: 'sviluppi-futuri',
        component: SviluppiFuturiPage,
      },

      // ============================
      {
        path: 'messaggi',
        component: ChatPage,
      },

      // ============================
      {
        path: 'trasporti',
        component: TransportPage,
      },
      {
        path: 'aule',
        component: ClassroomsPage,
      },

      // ============================
      {
        path: 'portali',
        component: PortalsPage,
      },

      // Sidebar Footer
      {
        path: 'partner-universitari',
        component: UniversityPartnerPage,
      },
      {
        path: 'contatti-universitari',
        component: UniversityContactsPage,
      },
      { path: 'segreteria', component: SecretariatPage },
      {
        path: 'impostazioni',
        component: SettingsPage,
      },
      { path: 'profilo', component: ProfiloPage },
    ],
  },

  // =============================================
  // Wildcard — 404
  // =============================================
  {
    path: '**',
    component: NotFoundPage,
  },
];
