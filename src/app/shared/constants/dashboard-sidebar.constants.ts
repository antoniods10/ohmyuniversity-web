import { Type } from '@angular/core';
import {
  LucideLayoutDashboard,
  LucideGraduationCap,
  LucideCalendarDays,
  LucideFilePenLine,
  LucideFolderOpen,
  LucideBadgeEuro,
  LucideBriefcase,
  LucideMessageSquare,
  LucideCompass,
  LucideSettings,
  LucideCircleUser,
  LucideLogOut,
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
    icon: LucideGraduationCap,
    route: '/dashboard/carriera',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'calendario',
    label: 'Calendario',
    icon: LucideCalendarDays,
    route: '/dashboard/calendario',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'esami',
    label: 'Esami',
    icon: LucideFilePenLine,
    route: '/dashboard/esami',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'documenti',
    label: 'Documenti',
    icon: LucideFolderOpen,
    route: '/dashboard/documenti',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'borse-studio',
    label: 'Borse di Studio',
    icon: LucideBadgeEuro,
    route: '/dashboard/borse-studio',
    roles: ['student', 'admin'],
    dividerAfter: true,
  },
  {
    id: 'tirocini',
    label: 'Tirocini',
    icon: LucideBriefcase,
    route: '/dashboard/tirocini',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'messaggi',
    label: 'Messaggi',
    icon: LucideMessageSquare,
    route: '/dashboard/messaggi',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'orientamento',
    label: 'Orientamento',
    icon: LucideCompass,
    route: '/dashboard/orientamento',
    roles: ['student', 'admin', 'professor'],
    dividerAfter: true,
  },
  {
    id: 'impostazioni',
    label: 'Impostazioni',
    icon: LucideSettings,
    route: '/dashboard/impostazioni',
    roles: ['student', 'admin', 'professor'],
  },
];

// =============================================
// Bottom-pinned items
// =============================================
export const SIDEBAR_BOTTOM_ITEMS: SidebarItem[] = [
  {
    id: 'profilo',
    label: 'Profilo',
    icon: LucideCircleUser,
    route: '/dashboard/profilo',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: LucideLogOut,
    route: '/login',
    roles: ['student', 'admin', 'professor'],
  },
];
