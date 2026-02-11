
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { Button } from './Button';

interface QuizGameProps {
  onBack: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsGameOver(false);
  };

  if (isGameOver) {
    const percentage = (score / QUIZ_QUESTIONS.length) * 100;
    let message = "أحسنت! أداء رائع 🌟";
    if (percentage === 100) message = "مذهل! أنت تعرف أحمد جيداً 🔥";
    if (percentage < 60) message = "لا بأس، يمكنك المحاولة مرة أخرى 📚";

    return (
      <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] p-10 shadow-xl border border-blue-50 text-center animate-in fade-in duration-500">
        <div className="text-7xl mb-6">🏆</div>
        <h2 className="text-3xl font-black text-black mb-2">انتهى الاختبار!</h2>
        <p className="text-lg text-gray-600 mb-8">{message}</p>
        
        <div className="bg-blue-50 rounded-3xl p-8 mb-8 border border-blue-100">
          <div className="text-6xl font-black text-blue-600 mb-2">{score} <span className="text-2xl text-blue-400">/ {QUIZ_QUESTIONS.length}</span></div>
          <div className="text-sm font-semibold text-blue-400 uppercase tracking-widest">النتيجة النهائية</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={resetQuiz} className="flex-1">إعادة الاختبار</Button>
          <Button onClick={onBack} variant="outline" className="flex-1">العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between px-2">
        <Button onClick={onBack} variant="ghost" className="!px-4">
          <span className="text-xl">←</span> العودة
        </Button>
        <div className="bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm font-bold text-blue-600">
          سؤال {currentStep + 1} من {QUIZ_QUESTIONS.length}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-blue-50 animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-full bg-gray-100 h-2 rounded-full mb-10 overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-10 leading-relaxed text-center">
          {currentQuestion.text}
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-10">
          {currentQuestion.options.map((option, idx) => {
            let stateClass = "border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-black";
            if (isAnswered) {
              if (idx === currentQuestion.correctAnswer) {
                stateClass = "bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20";
              } else if (idx === selectedOption) {
                stateClass = "bg-rose-50 border-rose-500 text-rose-700 ring-2 ring-rose-500/20";
              } else {
                stateClass = "opacity-50 border-gray-100 text-black";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-5 rounded-2xl border-2 text-right transition-all duration-200 text-lg font-bold flex items-center justify-between ${stateClass}`}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correctAnswer && <span className="text-2xl">✅</span>}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswer && <span className="text-2xl">❌</span>}
              </button>
            );
          })}
        </div>

        <Button 
          onClick={handleNext} 
          disabled={!isAnswered}
          className="w-full !py-4 text-xl"
        >
          {currentStep === QUIZ_QUESTIONS.length - 1 ? "مشاهدة النتائج" : "السؤال التالي"}
        </Button>
      </div>
    </div>
  );
};
