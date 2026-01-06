export interface Class {
  id: string;
  name: string;
  instructor: string;
  time: string;
  date: Date;
  endTime?: string;
  duration?: number;
  cost?: string;
  description?: string;
  registrationLink?: string;
  format?: string;
  featuredImage?: string;
  teacherImage?: string;
  isSpecialEvent?: boolean;
  isCancelled?: boolean;
  cancellationReason?: string;
  spotsAvailable?: number;
  totalSpots?: number;
}

export interface DateOption {
  date: Date;
  dayName: string;
  dayNumber: number;
  isSelected: boolean;
}
