
import { Hobby, Achievement, Question, TeacherEvaluation, GoalkeeperStats } from './types';

export const DEFAULT_STUDENT_NAME = "أحمد رامي العيتاني";
export const DEFAULT_STUDENT_AGE = 15;

export const DEFAULT_HOBBIES: Hobby[] = [
  { id: '1', name: "كرة القدم", icon: "⚽", description: "حراسة المرمى بمهارة عالية" },
  { id: '2', name: "ركوب الخيل", icon: "🐎", description: "عشق الفروسية والأصالة" },
  { id: '3', name: "التسلق", icon: "🧗", description: "تحدي المرتفعات والوصول للقمة" },
  { id: '4', name: "الرسم", icon: "🎨", description: "تعبير فني وتجسيد للخيال" },
  { id: '5', name: "رمي السهام", icon: "🏹", description: "دقة التركيز وإصابة الهدف" }
];

export const DEFAULT_GK_STATS: GoalkeeperStats = {
  diving: 94,
  positioning: 91,
  reflexes: 98,
  kicking: 88,
  overall: 99
};

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: "الميدالية الذهبية في الحراسة للناشئين",
    location: "جدة",
    icon: "🥇",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200"
  },
  {
    id: 'a2',
    title: "المركز الثاني في الحساب الذهني",
    year: "2019",
    location: "المملكة العربية السعودية",
    icon: "🏆",
    color: "bg-blue-100 text-blue-700 border-blue-200"
  }
];

export const DEFAULT_TEACHER_EVALUATIONS: TeacherEvaluation[] = [
  {
    id: 'e1',
    teacherName: "أ. محمد العمري",
    subject: "التربية البدنية",
    comment: "أحمد حارس مرمى بالفطرة، يتمتع بردود فعل سريعة وقيادة متميزة لخط الدفاع.",
    rating: 5
  },
  {
    id: 'e2',
    teacherName: "أ. خالد الحربي",
    subject: "الرياضيات",
    comment: "ذكاء حاد في الحساب الذهني وقدرة فائقة على حل المسائل المعقدة بسرعة مذهلة.",
    rating: 5
  }
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "ما هو الاسم الكامل للطالب المذكور؟",
    options: ["أحمد محمد العيتاني", "أحمد رامي العيتاني", "رامي أحمد العيتاني", "أحمد رامي القحطاني"],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "كم يبلغ عمر أحمد؟",
    options: ["13 سنة", "14 سنة", "15 سنة", "16 سنة"],
    correctAnswer: 2
  }
];
