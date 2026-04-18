
export enum UserRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  SUPERVISOR = 'SUPERVISOR',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  name: string;
  teacher: string;
  location: string;
  time: string;
  class_name: string;
  status: 'active' | 'upcoming' | 'finished';
}

export interface Homework {
  id: string;
  title: string;
  deadline: string;
  course: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue' | 'returned';
  score?: number;
  type: 'text' | 'file' | 'media';
  feedback?: string;
  attachmentUrl?: string;
  studentAnswerUrl?: string;
  submitTime?: string;
}

export interface Evaluation {
  id: string;
  courseName: string;
  totalStudents: number;
  evaluatedCount: number;
  endTime: string;
  status: 'active' | 'closed';
  duration?: number;
}

export interface AttendanceRecord {
  date: string;
  course: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  time: string;
  seat?: string;
}

export interface Lecture {
  id: string;
  title: string;
  speaker: string;
  status: 'live' | 'ended';
  viewers: number;
  cover: string;
  date: string;
  duration?: string;
}

export interface Message {
  id: string;
  type: 'homework' | 'course' | 'system';
  title: string;
  content: string;
  time: string;
  read: boolean;
}

export enum ChartType {
  PIE = 'PIE',
  BAR = 'BAR',
  LINE = 'LINE'
}
