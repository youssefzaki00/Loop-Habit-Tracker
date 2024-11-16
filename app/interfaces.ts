import { Timestamp } from "firebase/firestore";

// DaysNavbarProps - No changes needed as it's already correctly defined
export interface DaysNavbarProps {
  days: { day: string; date: number }[];
}

// Define booleanHabit and measurableHabit types
export interface booleanHabit {
  id?: string;
  name: string;
  color: string;
  question: string;
  frequency: string;
  notes: string;
  type: "boolean";
  createdAt: Timestamp | Date;
  habitScore: { [date: string]: number }; // Update to specify a structure
  checkMarks: { [date: string]: boolean }; // Update to specify a structure
  habitSummary: any;
}

export interface measurableHabit {
  id?: string;
  name: string;
  color: string;
  unit: string;
  target: number;
  targetType: string;
  question: string;
  frequency: string;
  notes: string;
  type: "measurable";
  createdAt: Timestamp | Date;
  habitScore: { [date: string]: number }; // Update to specify a structure
  habitLogs: { [date: string]: number }; // Update to specify a structure
  checkMarks: { [date: string]: boolean }; // Update to specify a structure
  habitSummary: any;
}

// User context type with userUid as a string or null, and loading as boolean
export interface UserContextType {
  userUid: string | null;
  loading: boolean;
}

// HabitProps type to handle either boolean or measurable habits
export interface HabitProps {
  habitData: booleanHabit | measurableHabit;
}
