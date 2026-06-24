import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthRepository } from './core/domain/repositories/auth.repository';
import { AuthApiRepository } from './core/infrastructure/api/auth-api.repository';
import { AuthFacade } from './core/application/facades/auth.facade';
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
  LucideLoaderCircle,
  LucideDownload,
  LucideArrowRight,
  LucideTrash2,
  LucideCircleCheck,
  LucideHeart,
  LucideStar,
  LucideSearch,
  LucideShare2,
  LucidePlus,
  LucideShield,
  LucideTriangleAlert,
  LucideCircleX,
  LucideInfo,
  LucideTag,
  LucideFlame,
  LucideClock,
  LucideWifi,
  LucideFunnel,
  LucideSend,
  LucidePaperclip,
  LucideFile,
  LucideLink,
  LucideUsers,
  LucideArrowLeft,
  LucideChevronRight,
  LucideUser,
  LucideMail,
  LucidePhone,
  LucideMapPin,
  LucideCalendar,
  LucidePencil,
  LucideBookOpen,
  LucideAward,
  LucideKey,
  LucideCamera,
  LucideExternalLink,
  LucideBuilding2,
  LucideMap,
  LucideCalendarPlus,
  LucideLayers,
  LucideMonitor,
  LucideZap,
  LucideWallet,
  LucideCalendarCheck,
  LucideCalendarX,
  LucideClipboardList,
  LucideClipboardCheck,
  LucideHeadphones,
  LucideMegaphone,
  LucideCreditCard,
  LucideCircleAlert,
  LucideEuro,
  LucideBookMarked,
  LucideThumbsUp,
  LucideSun,
  LucideSparkles,
  LucideCalculator,
  LucideHourglass,
} from '@lucide/angular';
import { CarrieraRepository } from './core/domain/repositories/carriera.repository';
import { CarrieraApiRepository } from './core/infrastructure/api/carriera-api.repository';
import { CalendarFacade } from './core/application/facades/calendar.facade';
import { CalendarRepository } from './core/domain/repositories/calendar.repository';
import { CalendarApiRepository } from './core/infrastructure/api/calendar-api.repository';
import { TimetableRepository } from './core/domain/repositories/timetable.repository';
import { TimetableApiRepository } from './core/infrastructure/api/timetable-api.repository';
import { CarrieraFacade } from './core/application/facades/carriera.facade';
import { TimetableFacade } from './core/application/facades/timetable.facade';
import { LoginUseCase } from './core/application/usecases/auth/login.usecase';
import { LogoutUseCase } from './core/application/usecases/auth/logout.usecase';
import { RefreshTokenUseCase } from './core/application/usecases/auth/refresh-token.usecase';
import { GetTasseUseCase } from './core/application/usecases/fees/get-tasse.usecase';
import { GetAppelliPrenotabiliUseCase } from './core/application/usecases/career/get-appelli-prenotabili.usecase';
import { GetBadgeUseCase } from './core/application/usecases/career/get-badge.usecase';
import { GetCarrieraInfoUseCase } from './core/application/usecases/career/get-carriera-info.usecase';
import { GetEsamiSuggeриtiUseCase } from './core/application/usecases/career/get-esami-suggeriti.usecase';
import { GetFotoUseCase } from './core/application/usecases/career/get-foto.usecase';
import { GetLibrettoUseCase } from './core/application/usecases/career/get-libretto.usecase';
import { GetMediaUseCase } from './core/application/usecases/career/get-media.usecase';
import { GetPianoUseCase } from './core/application/usecases/career/get-piano.usecase';
import { GetPrenotazioniLibrettoUseCase } from './core/application/usecases/career/get-prenotazioni-libretto.usecase';
import { GetPrenotazioniUseCase } from './core/application/usecases/career/get-prenotazioni.usecase';
import { GetProfiloUseCase } from './core/application/usecases/career/get-profilo.usecase';
import { GetQuestionariUseCase } from './core/application/usecases/career/get-questionari.usecase';
import { GetStoricoEsamiUseCase } from './core/application/usecases/career/get-storico-esami.usecase';
import { SwitchCarrieraUseCase } from './core/application/usecases/career/switch-carriera.usecase';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),

    // Auth
    { provide: AuthRepository, useClass: AuthApiRepository },
    { provide: CarrieraRepository, useClass: CarrieraApiRepository },
    { provide: CalendarRepository, useClass: CalendarApiRepository },
    { provide: TimetableRepository, useClass: TimetableApiRepository },
    AuthFacade,
    LoginUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    CarrieraFacade,
    GetTasseUseCase,
    GetLibrettoUseCase,
    GetMediaUseCase,
    GetPianoUseCase,
    GetPrenotazioniUseCase,
    GetBadgeUseCase,
    GetEsamiSuggeриtiUseCase,
    GetAppelliPrenotabiliUseCase,
    GetPrenotazioniLibrettoUseCase,
    GetStoricoEsamiUseCase,
    GetQuestionariUseCase,
    GetProfiloUseCase,
    GetCarrieraInfoUseCase,
    GetFotoUseCase,
    SwitchCarrieraUseCase,
    CalendarFacade,
    TimetableFacade,

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
      LucideLoaderCircle,
      LucideDownload,
      LucideArrowRight,
      LucideTrash2,
      LucideCircleCheck,
      LucideHeart,
      LucideStar,
      LucideSearch,
      LucideShare2,
      LucidePlus,
      LucideShield,
      LucideTriangleAlert,
      LucideCircleX,
      LucideInfo,
      LucideTag,
      LucideFlame,
      LucideClock,
      LucideWifi,
      LucideFunnel,
      LucideSend,
      LucidePaperclip,
      LucideFile,
      LucideLink,
      LucideUsers,
      LucideArrowLeft,
      LucideChevronRight,
      LucideUser,
      LucideMail,
      LucidePhone,
      LucideMapPin,
      LucideCalendar,
      LucidePencil,
      LucideBookOpen,
      LucideAward,
      LucideKey,
      LucideCamera,
      LucideExternalLink,
      LucideBuilding2,
      LucideMap,
      LucideCalendarPlus,
      LucideLayers,
      LucideMonitor,
      LucideZap,
      LucideWallet,
      LucideCalendarCheck,
      LucideCalendarX,
      LucideClipboardList,
      LucideClipboardCheck,
      LucideHeadphones,
      LucideMegaphone,
      LucideCreditCard,
      LucideCircleAlert,
      LucideEuro,
      LucideBookMarked,
      LucideThumbsUp,
      LucideSun,
      LucideSparkles,
      LucideCalculator,
      LucideHourglass,
    ),
  ],
};
