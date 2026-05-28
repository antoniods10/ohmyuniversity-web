import { Type } from '@angular/core';
import {
  LucideLayoutDashboard,
  LucideGraduationCap,
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
    id: 'didattica',
    label: 'Didattica',
    icon: LucideGraduationCap,
    route: '/dashboard/didattica',
    roles: ['student', 'admin', 'professor'],
  },
  {
    id: 'orientamento',
    label: 'Orientamento',
    icon: LucideCompass,
    route: '/dashboard/orientamento',
    roles: ['student', 'admin', 'professor'],
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
    dividerAfter: true
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
