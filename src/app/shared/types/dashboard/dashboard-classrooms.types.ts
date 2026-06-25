import { Identifiable } from '@shared/types';

/** Available classroom features */
export type ClassroomFeature = 'projector' | 'lim' | 'wifi' | 'power' | 'ac';

/** Available classroom types */
export type ClassroomType = 'lecture' | 'lab' | 'seminar' | 'exam';

/** A bookable classroom with its features and availability */
export interface Classroom extends Identifiable {
  building: string;
  floor: string;
  capacity: number;
  features: ClassroomFeature[];
  available: boolean;
  type: ClassroomType;
}

/** A university building containing classrooms */
export interface Building extends Identifiable {
  address: string;
  classrooms: Classroom[];
}

/** A university campus in a specific city */
export interface Campus extends Identifiable {
  city: string;
  buildings: Building[];
}
