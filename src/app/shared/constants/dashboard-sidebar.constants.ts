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
    id: 'career',
    label: 'Carriera',
    icon: LucideChartLine,
    route: '/dashboard/carriera',
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
    id: 'exams',
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
    id: 'schedules',
    label: 'Orario Lezioni',
    icon: LucideCalendarClock,
    route: '/dashboard/orario-lezioni',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'sviluppi-futuri',
    label: 'Sviluppi Futuri',
    icon: LucideSignpostBig,
    route: '/dashboard/sviluppi-futuri',
    roles: ['student', 'admin', 'professor'],
    dividerAfter: true,
  },
  {
    id: 'chat',
    label: 'Messaggi',
    icon: LucideMessageSquare,
    route: '/dashboard/messaggi',
    roles: ['student', 'admin', 'professor'],
    dividerAfter: true,
  },
  {
    id: 'transport',
    label: 'Trasporti',
    icon: LucideBus,
    route: '/dashboard/trasporti',
    roles: ['student', 'admin', 'professor'],
    dividerAfter: true,
  },
  {
    id: 'classrooms',
    label: 'Aule',
    icon: LucideDoorOpen,
    route: '/dashboard/aule',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'portals',
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
    route: '/dashboard/partner-universitari',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'university-contacts',
    label: 'Contatti',
    icon: LucideContactRound,
    route: '/dashboard/contatti-universitari',
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
    id: 'settings',
    label: 'Impostazioni',
    icon: LucideSettings,
    route: '/dashboard/impostazioni',
    roles: ['student', 'admin', 'professor'],
  },
];
