import { Type } from '@angular/core';
import {
  LucideLayoutDashboard,
  LucideGraduationCap,
  LucideHandshake,
  LucideMessageSquare,
  LucideSignpostBig,
  LucideSettings,
  LucideFileText,
  LucideCalendarDays,
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
    id: 'didattica',
    label: 'Didattica',
    icon: LucideGraduationCap,
    route: '/dashboard/didattica',
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
    id: 'documenti',
    label: 'Documenti',
    icon: LucideFileText,
    route: '/dashboard/documenti',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'sviluppi futuri',
    label: 'Sviluppi Futuri',
    icon: LucideSignpostBig,
    route: '/dashboard/sviluppi-futuri',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'messaggi',
    label: 'Messaggi',
    icon: LucideMessageSquare,
    route: '/dashboard/messaggi',
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
    id: 'impostazioni',
    label: 'Impostazioni',
    icon: LucideSettings,
    route: '/dashboard/impostazioni',
    roles: ['student', 'admin', 'professor'],
  },
];
