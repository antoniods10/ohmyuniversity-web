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
    roles: ['student', 'admin', 'professor'],
    color: 'dashboard',
  },
  {
    id: 'career',
    label: 'Carriera',
    icon: LucideChartLine,
    route: '/dashboard/carriera',
    roles: ['student', 'admin', 'professor'],
    color: 'career',
  },

  {
    id: 'exams',
    label: 'Appelli',
    icon: LucideBookOpenCheck,
    route: '/dashboard/appelli',
    roles: ['student', 'admin', 'professor'],
    color: 'exams',
  },
  {
    id: 'agenda',
    label: 'Agenda',
    icon: LucideCalendarDays,
    route: '/dashboard/agenda',
    roles: ['student', 'admin', 'professor'],
    color: 'agenda',
  },
  {
    id: 'schedules',
    label: 'Orario Lezioni',
    icon: LucideCalendarClock,
    route: '/dashboard/orario-lezioni',
    roles: ['student', 'admin', 'professor'],
    color: 'schedules',
  },
  {
    id: 'sviluppi-futuri',
    label: 'Sviluppi Futuri',
    icon: LucideSignpostBig,
    route: '/dashboard/sviluppi-futuri',
    roles: ['student', 'admin', 'professor'],
    color: 'future',
    dividerAfter: true,
  },
  {
    id: 'chat',
    label: 'Messaggi',
    icon: LucideMessageSquare,
    route: '/dashboard/messaggi',
    roles: ['student', 'admin', 'professor'],
    color: 'messages',
    dividerAfter: true,
  },
  {
    id: 'transport',
    label: 'Trasporti',
    icon: LucideBus,
    route: '/dashboard/trasporti',
    roles: ['student', 'admin', 'professor'],
    color: 'transport',
    dividerAfter: true,
  },
  {
    id: 'classrooms',
    label: 'Aule',
    icon: LucideDoorOpen,
    route: '/dashboard/aule',
    roles: ['student', 'admin', 'professor'],
    color: 'classrooms',
  },
  {
    id: 'portals',
    label: 'Portali',
    icon: LucideExternalLink,
    route: '/dashboard/portali',
    roles: ['student', 'admin', 'professor'],
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
    roles: ['student', 'admin', 'professor'],
    color: 'partner',
  },
  {
    id: 'university-contacts',
    label: 'Contatti',
    icon: LucideContactRound,
    route: '/dashboard/contatti-universitari',
    roles: ['student', 'admin', 'professor'],
    color: 'contacts',
  },
  {
    id: 'segreteria',
    label: 'Segreteria',
    icon: LucidePrinter,
    route: '/dashboard/segreteria',
    roles: ['student', 'admin', 'professor'],
    color: 'secretariat',
  },
  {
    id: 'settings',
    label: 'Impostazioni',
    icon: LucideSettings,
    route: '/dashboard/impostazioni',
    roles: ['student', 'admin', 'professor'],
    color: 'settings',
  },
];
