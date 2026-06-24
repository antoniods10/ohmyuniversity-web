import {
  LucideLayoutDashboard,
  LucideChartLine,
  LucideHandshake,
  LucideMessageSquare,
  LucideSignpostBig,
  LucideSettings,
  LucideCalendarDays,
  LucideContactRound,
  LucidePrinter,
  LucideCalendarClock,
  LucideBus,
  LucideBookOpenCheck,
  LucideDoorOpen,
  LucideExternalLink,
} from '@lucide/angular';
import { Icon } from '@types';

export type UserRole = 'student' | 'admin' | 'professor';

export interface SidebarItem {
  id: string;
  label: string;
  icon: Icon;
  route: string;
  requiresCarriera: boolean;
  color: string;
  dividerAfter?: boolean;
}

// =============================================
// Main navigation items
// =============================================

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LucideLayoutDashboard,
    route: '/dashboard',
    requiresCarriera: false,
    color: 'dashboard',
  },
  {
    id: 'career',
    label: 'Carriera',
    icon: LucideChartLine,
    route: '/dashboard/carriera',
    requiresCarriera: true,
    color: 'career',
  },
  {
    id: 'exams',
    label: 'Appelli',
    icon: LucideBookOpenCheck,
    route: '/dashboard/appelli',
    requiresCarriera: true,
    color: 'exams',
  },
  {
    id: 'agenda',
    label: 'Agenda',
    icon: LucideCalendarDays,
    route: '/dashboard/agenda',
    requiresCarriera: false,
    color: 'agenda',
  },
  {
    id: 'schedules',
    label: 'Orario Lezioni',
    icon: LucideCalendarClock,
    route: '/dashboard/orario-lezioni',
    requiresCarriera: false,
    color: 'schedules',
  },
  {
    id: 'sviluppi-futuri',
    label: 'Sviluppi Futuri',
    icon: LucideSignpostBig,
    route: '/dashboard/sviluppi-futuri',
    requiresCarriera: false,
    color: 'future',
    dividerAfter: true,
  },
  {
    id: 'chat',
    label: 'Messaggi',
    icon: LucideMessageSquare,
    route: '/dashboard/messaggi',
    requiresCarriera: false,
    color: 'messages',
    dividerAfter: true,
  },
  {
    id: 'transport',
    label: 'Trasporti',
    icon: LucideBus,
    route: '/dashboard/trasporti',
    requiresCarriera: false,
    color: 'transport',
    dividerAfter: true,
  },
  {
    id: 'classrooms',
    label: 'Aule',
    icon: LucideDoorOpen,
    route: '/dashboard/aule',
    requiresCarriera: false,
    color: 'classrooms',
  },
  {
    id: 'portals',
    label: 'Portali',
    icon: LucideExternalLink,
    route: '/dashboard/portali',
    requiresCarriera: false,
    color: 'portals',
    dividerAfter: true,
  },
];

// =============================================
// Bottom-pinned items
// =============================================
export const SIDEBAR_BOTTOM_ITEMS: SidebarItem[] = [
  {
    id: 'partner',
    label: 'Partner',
    icon: LucideHandshake,
    route: '/dashboard/partner-universitari',
    requiresCarriera: false,
    color: 'partner',
  },
  {
    id: 'university-contacts',
    label: 'Contatti',
    icon: LucideContactRound,
    route: '/dashboard/contatti-universitari',
    requiresCarriera: false,
    color: 'contacts',
  },
  {
    id: 'segreteria',
    label: 'Segreteria',
    icon: LucidePrinter,
    route: '/dashboard/segreteria',
    requiresCarriera: false,
    color: 'secretariat',
  },
  {
    id: 'settings',
    label: 'Impostazioni',
    icon: LucideSettings,
    route: '/dashboard/impostazioni',
    requiresCarriera: false,
    color: 'settings',
  },
];
