import { Exam } from '@shared/types/dashboard/career.types';
import { RigaLibretto } from 'src/app/core/domain/models/career/libretto.model';
import { RigaPiano } from 'src/app/core/domain/models/career/piano.model';

function rigaToExam(
  adCod: string,
  adDes: string,
  cfu: number,
  annoCorso: number,
  tipoInsCod: string,
  superata: boolean,
  librettoRiga?: RigaLibretto,
): Exam {
  return {
    courseCode: adCod,
    courseName: adDes,
    cfu: cfu ?? 0,
    academicYear: annoCorso ?? 1,
    category: tipoInsCod === 'S' ? 'ELECTIVE' : 'MANDATORY',
    status: superata ? 'PASSED' : 'TO_TAKE',
    grade:
      librettoRiga?.voto != null ? (librettoRiga.lode ? '30L' : String(librettoRiga.voto)) : '',
    simulatedGrade: undefined,
    language: 'N/D',
    period: 'N/D' as any,
    durationHours: 0,
    attendance: 'N/D' as any,
    scientificSector: 'N/D',
    location: 'N/D',
    prerequisites: [],
    cfuBreakdown: [],
  };
}

export function mergeToExams(righe: RigaPiano[], libretto: RigaLibretto[]): Exam[] {
  const librettoByAdsceId = new Map<number, RigaLibretto>();
  const librettoByAdCod = new Map<string, RigaLibretto>();
  for (const riga of libretto) {
    if (riga.adsceId != null) librettoByAdsceId.set(riga.adsceId, riga);
    librettoByAdCod.set(riga.adCod, riga);
  }

  const pianoAdCods = new Set(righe.map(r => r.adCod));
  const result: Exam[] = [];

  for (const riga of righe) {
    const librettoRiga =
      (riga.adsceId != null ? librettoByAdsceId.get(riga.adsceId) : undefined) ??
      librettoByAdCod.get(riga.adCod);

    const superata = riga.superata ?? librettoRiga?.superata ?? false;

    result.push(
      rigaToExam(
        riga.adCod,
        riga.adDes,
        riga.cfu,
        riga.annoCorso,
        riga.tipoInsCod,
        superata,
        librettoRiga,
      ),
    );
  }

  for (const riga of libretto) {
    if (!pianoAdCods.has(riga.adCod)) {
      result.push(
        rigaToExam(
          riga.adCod,
          riga.adDes,
          riga.peso ?? 0,
          riga.annoCorso,
          riga.tipoInsCod ?? '',
          riga.superata ?? false,
          riga,
        ),
      );
    }
  }

  return result;
}
