/** Available classroom features */
export type ClassroomFeature = 'projector' | 'lim' | 'wifi' | 'power' | 'ac';

/** Available classroom types */
export type ClassroomType = 'lecture' | 'lab' | 'seminar' | 'exam';

/** A bookable classroom with its features and availability */
export interface Classroom {
  id: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  features: ClassroomFeature[];
  available: boolean;
  type: ClassroomType;
}

/** A university building containing classrooms */
export interface Building {
  id: string;
  name: string;
  address: string;
  classrooms: Classroom[];
}

/** A university campus in a specific city */
export interface Campus {
  id: string;
  city: string;
  label: string;
  buildings: Building[];
}
