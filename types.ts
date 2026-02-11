
export interface Hobby {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  year?: string;
  location?: string;
  icon: string;
  color: string;
}

export interface TeacherEvaluation {
  id: string;
  teacherName: string;
  subject: string;
  comment: string;
  rating: number; // 1-5
}

export interface GoalkeeperStats {
  diving: number;
  positioning: number;
  reflexes: number;
  kicking: number;
  overall: number;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export enum Page {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  ADMIN = 'ADMIN'
}
