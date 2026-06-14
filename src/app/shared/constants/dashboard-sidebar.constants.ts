import { Type } from '@angular/core';
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

export type UserRole = 'student' | 'admin' | 'professor';

export interface SidebarItem {
  id: string;
  label: string;
  icon: Type<unknown>;
  route: string;
  roles: UserRole[];
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
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'carriera',
    label: 'Carriera',
    icon: LucideChartLine,
    route: '/dashboard/didattica',
    roles: ['student', 'admin', 'professor'],
  },
  // @TODO: Sub-path didattica
  // {
  //   id: 'panoramica-didattica',
  //   label: 'panoramica-didattica',
  //   icon: LucideGraduationCap,
  //   route: '/dashboard/didattica/panoramica-didattica',
  //   roles: ['student', 'admin', 'professor'],
  // },
  // {
  //   id: 'esami',
  //   label: 'Esami',
  //   icon: LucideGraduationCap,
  //   route: '/dashboard/didattica/esami',
  //   roles: ['student', 'admin', 'professor'],
  // },
  // {
  //   id: 'piano-di-studi',
  //   label: 'Piano di Studi',
  //   icon: LucideGraduationCap,
  //   route: '/dashboard/didattica/piano-di-studi',
  //   roles: ['student', 'admin', 'professor'],
  // },
  {
    id: 'appelli',
    label: 'Appelli',
    icon: LucideBookOpenCheck,
    route: '/dashboard/appelli',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'agenda',
    label: 'Agenda',
    icon: LucideCalendarDays,
    route: '/dashboard/agenda',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'orario-lezioni',
    label: 'Orario Lezioni',
    icon: LucideCalendarClock,
    route: '/dashboard/orario-lezioni',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'sviluppi futuri',
    label: 'Sviluppi Futuri',
    icon: LucideSignpostBig,
    route: '/dashboard/sviluppi-futuri',
    roles: ['student', 'admin', 'professor'],
    dividerAfter: true,
  },
  {
    id: 'messaggi',
    label: 'Messaggi',
    icon: LucideMessageSquare,
    route: '/dashboard/messaggi',
    roles: ['student', 'admin', 'professor'],
    dividerAfter: true,
  },
  {
    id: 'trasporti',
    label: 'Trasporti',
    icon: LucideBus,
    route: '/dashboard/trasporti',
    roles: ['student', 'admin', 'professor'],
    dividerAfter: true,
  },
  {
    id: 'aule',
    label: 'Aule',
    icon: LucideDoorOpen,
    route: '/dashboard/aule',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'portali',
    label: 'Portali',
    icon: LucideExternalLink,
    route: '/dashboard/portali',
    roles: ['student', 'admin', 'professor'],
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
    route: '/dashboard/partner',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'contatti',
    label: 'Contatti',
    icon: LucideContactRound,
    route: '/dashboard/contatti',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'segreteria',
    label: 'Segreteria',
    icon: LucidePrinter,
    route: '/dashboard/segreteria',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'impostazioni',
    label: 'Impostazioni',
    icon: LucideSettings,
    route: '/dashboard/impostazioni',
    roles: ['student', 'admin', 'professor'],
  },
];
