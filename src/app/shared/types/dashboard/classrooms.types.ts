export interface Classroom {
  id: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  features: ('projector' | 'lim' | 'wifi' | 'power' | 'ac')[];
  available: boolean;
  type: 'lecture' | 'lab' | 'seminar' | 'exam';
}

export interface Building {
  id: string;
  name: string;
  address: string;
  classrooms: Classroom[];
}

export interface Campus {
  id: string;
  city: string;
  label: string;
  buildings: Building[];
}
