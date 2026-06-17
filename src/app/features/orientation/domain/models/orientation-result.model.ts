export type AreaId =
  | 'umanistica'
  | 'scientifica'
  | 'ingegneria'
  | 'economica'
  | 'sanitaria'
  | 'artistica';

export interface AreaScore {
  areaId: AreaId;
  label: string;
  score: number;
  emoji: string;
}

export interface OrientationResult {
  topAreas: AreaScore[];
  dominantArea: AreaScore;
  fuoriSede: boolean;
  fasciaIsee: string | null;
  completedAt: Date;
}
