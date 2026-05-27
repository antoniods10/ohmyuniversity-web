import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import {
  provideLucideIcons,
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
  LucidePanelLeftClose,
  LucidePanelLeftOpen,
  LucideBell,
  LucideChevronUp,
  LucideX,
} from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideLucideIcons(
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
      LucidePanelLeftClose,
      LucidePanelLeftOpen,
      LucideBell,
      LucideChevronUp,
      LucideX,
    ),
  ],
};
