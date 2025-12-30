export interface Class {
  id: string;
  name: string;
  instructor: string;
  time: string;
  date: Date;
  spotsAvailable: number;
  totalSpots: number;
}

export interface DateOption {
  date: Date;
  dayName: string;
  dayNumber: number;
  isSelected: boolean;
}
