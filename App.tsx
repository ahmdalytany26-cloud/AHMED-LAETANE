
import React, { useState, useEffect } from 'react';
import { Page, Hobby, Achievement, TeacherEvaluation, GoalkeeperStats } from './types';
import { 
  DEFAULT_STUDENT_NAME, 
  DEFAULT_STUDENT_AGE, 
  DEFAULT_HOBBIES, 
  DEFAULT_ACHIEVEMENTS, 
  DEFAULT_TEACHER_EVALUATIONS, 
  DEFAULT_GK_STATS 
} from './constants';
import { QuizGame } from './components/QuizGame';
import { Button } from './components/Button';
import { FifaCard } from './components/FifaCard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  
  // App State - Loaded from LocalStorage or Defaults
  const [studentName, setStudentName] = useState(() => localStorage.getItem('studentName') || DEFAULT_STUDENT_NAME);
  const [studentAge, setStudentAge] = useState(() => Number(localStorage.getItem('studentAge')) || DEFAULT_STUDENT_AGE);
  const [hobbies, setHobbies] = useState<Hobby[]>(() => JSON.parse(localStorage.getItem('hobbies') || JSON.stringify(DEFAULT_HOBBIES)));
  const [achievements, setAchievements] = useState<Achievement[]>(() => JSON.parse(localStorage.getItem('achievements') || JSON.stringify(DEFAULT_ACHIEVEMENTS)));
  const [evaluations, setEvaluations] = useState<TeacherEvaluation[]>(() => JSON.parse(localStorage.getItem('evaluations') || JSON.stringify(DEFAULT_TEACHER_EVALUATIONS)));
  const [gkStats, setGkStats] = useState<GoalkeeperStats>(() => JSON.parse(localStorage.getItem('gkStats') || JSON.stringify(DEFAULT_GK_STATS)));

  // Persist State
  useEffect(() => {
    localStorage.setItem('studentName', studentName);
    localStorage.setItem('studentAge', studentAge.toString());
    localStorage.setItem('hobbies', JSON.stringify(hobbies));
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('evaluations', JSON.stringify(evaluations));
    localStorage.setItem('gkStats', JSON.stringify(gkStats));
  }, [studentName, studentAge, hobbies, achievements, evaluations, gkStats]);

  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [newEval, setNewEval] = useState({ teacherName: '', subject: '', comment: '', rating: 5 });

  const handleAddEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEval.teacherName || !newEval.subject || !newEval.comment) return;
    const evaluation: TeacherEvaluation = { ...newEval, id: Date.now().toString() };
    setEvaluations([evaluation, ...evaluations]);
    setNewEval({ teacherName: '', subject: '', comment: '', rating: 5 });
    setIsTeacherModalOpen(false);
  };

  const handleAdminAccess = () => {
    if (isAdminAuthenticated) {
      setCurrentPage(Page.ADMIN);
    } else {
      setShowPinModal(true);
      setPinInput('');
      setPinError(false);
    }
  };

  const verifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '4055') {
      setIsAdminAuthenticated(true);
      setShowPinModal(false);
      setCurrentPage(Page.ADMIN);
    } else {
      setPinError(true);
      setPinInput('');
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const renderHome = () => (
    <div className="space-y-16 animate-in fade-in duration-700">
      <section className="text-center bg-white/80 backdrop-blur-md rounded-[3rem] p-10 sm:p-20 shadow-xl border border-sky-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        <div className="relative z-10">
          <div className="w-32 h-32 bg-sky-100 rounded-full mx-auto mb-8 flex items-center justify-center text-5xl shadow-inner border-4 border-white">🎓</div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-4 tracking-tight">{studentName}</h1>
          <p className="text-xl sm:text-2xl text-sky-600 font-bold mb-8">طالب طموح • {studentAge} سنة</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={() => setCurrentPage(Page.QUIZ)} variant="primary" className="!px-10 !py-4 text-lg">لعبة التحدي 🎮</Button>
            <Button variant="outline" className="!px-10 !py-4 text-lg bg-white/50 border-sky-200 text-sky-700" onClick={() => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })}>استكشف الإنجازات ✨</Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/95 backdrop-blur-lg rounded-[4rem] p-12 overflow-hidden relative border-4 border-yellow-500/20 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-right text-white">
            <div className="inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase mb-2">الملف الرياضي المتميز</div>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight">أرقام تتحدث عن <span className="text-yellow-500 italic">الإتقان</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed">في عالم كرة القدم، الأرقام هي التي تحدد مستوى الاحتراف. إليكم بطاقة أحمد "فيفا" التي تجسد مهاراته كحارس مرمى متمكن.</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10"><div className="text-yellow-500 text-2xl font-black">{gkStats.reflexes}%</div><div className="text-gray-400 text-xs">سرعة الارتداد</div></div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10"><div className="text-yellow-500 text-2xl font-black">{gkStats.diving}%</div><div className="text-gray-400 text-xs">دقة الارتماء</div></div>
            </div>
          </div>
          <div className="shrink-0"><FifaCard stats={gkStats} name={studentName} /></div>
        </div>
      </section>

      <section id="achievements" className="space-y-8">
        <div className="flex items-center gap-4 mb-8"><div className="h-10 w-2 bg-sky-500 rounded-full shadow-lg"></div><h2 className="text-3xl font-black text-slate-800">أبرز الإنجازات</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach) => (
            <div key={ach.id} className={`flex items-start gap-6 p-8 rounded-[2rem] border-2 shadow-lg ${ach.color} bg-white/80 backdrop-blur-sm`}>
              <div className="text-5xl shrink-0">{ach.icon}</div>
              <div><h3 className="text-2xl font-bold mb-2">{ach.title}</h3><div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold opacity-80">{ach.location && <span>📍 {ach.location}</span>}{ach.year && <span>📅 {ach.year}</span>}</div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4"><div className="h-10 w-2 bg-purple-500 rounded-full"></div><h2 className="text-3xl font-black text-slate-800">تقييم المعلمين</h2></div>
          <Button onClick={() => setIsTeacherModalOpen(true)} variant="outline" className="border-purple-500 text-purple-600 !py-2 !px-4 text-sm">إضافة تقييم معلم 📝</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {evaluations.map((evalItem) => (
            <div key={evalItem.id} className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-purple-100 shadow-lg border-r-8 border-r-purple-500">
              <div className="flex justify-between items-start mb-4">
                <div><h4 className="font-black text-slate-900 text-lg">{evalItem.teacherName}</h4><span className="text-purple-600 text-sm font-bold">{evalItem.subject}</span></div>
                <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<span key={i} className={i < evalItem.rating ? "opacity-100" : "opacity-20"}>★</span>))}</div>
              </div>
              <p className="text-slate-600 leading-relaxed italic">"{evalItem.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4 mb-8"><div className="h-10 w-2 bg-emerald-500 rounded-full"></div><h2 className="text-3xl font-black text-slate-800">الهوايات والاهتمامات</h2></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {hobbies.map((hobby) => (
            <div key={hobby.id} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-sky-50 group transition-all">
              <div className="text-4xl mb-4 group-hover:rotate-12 duration-300 inline-block">{hobby.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{hobby.name}</h3>
              <p className="text-slate-500 text-sm">{hobby.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teacher Entry Modal */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsTeacherModalOpen(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl p-8"><h2 className="text-2xl font-black mb-6">بوابة المعلمين 🍎</h2>
            <form onSubmit={handleAddEvaluation} className="space-y-4">
              <input required className="w-full p-4 rounded-2xl bg-slate-50 border" placeholder="اسم المعلم" value={newEval.teacherName} onChange={(e) => setNewEval({...newEval, teacherName: e.target.value})} />
              <input required className="w-full p-4 rounded-2xl bg-slate-50 border" placeholder="المادة الدراسية" value={newEval.subject} onChange={(e) => setNewEval({...newEval, subject: e.target.value})} />
              <div className="flex gap-2">{[1,2,3,4,5].map(s => (<button type="button" key={s} onClick={() => setNewEval({...newEval, rating: s})} className={`text-2xl ${s <= newEval.rating ? 'text-yellow-400' : 'text-slate-200'}`}>★</button>))}</div>
              <textarea required rows={4} className="w-full p-4 rounded-2xl bg-slate-50 border resize-none" placeholder="التعليق..." value={newEval.comment} onChange={(e) => setNewEval({...newEval, comment: e.target.value})}></textarea>
              <Button type="submit" className="w-full !py-4 text-lg">نشر التقييم</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderAdmin = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-4 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-slate-900">لوحة التحكم (المسؤول) 🛠️</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsAdminAuthenticated(false)} variant="outline" className="text-slate-600">تسجيل الخروج</Button>
          <Button onClick={() => { if(window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط كافة البيانات؟')) { localStorage.clear(); window.location.reload(); } }} variant="ghost" className="text-rose-600 hover:bg-rose-50">إعادة ضبط المصنع</Button>
        </div>
      </div>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold mb-6 text-sky-600">البيانات الأساسية</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-bold text-slate-500 mb-2">اسم الطالب</label><input className="w-full p-4 rounded-xl border bg-slate-50" value={studentName} onChange={(e) => setStudentName(e.target.value)} /></div>
          <div><label className="block text-sm font-bold text-slate-500 mb-2">عمر الطالب</label><input type="number" className="w-full p-4 rounded-xl border bg-slate-50" value={studentAge} onChange={(e) => setStudentAge(Number(e.target.value))} /></div>
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold mb-6 text-yellow-600">إحصائيات الفيفا</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(gkStats).map(([key, val]) => (
            <div key={key}><label className="block text-xs font-bold text-slate-400 mb-1 capitalize">{key}</label><input type="number" className="w-full p-3 rounded-xl border bg-slate-50 text-center font-bold" value={val} onChange={(e) => setGkStats({...gkStats, [key]: Number(e.target.value)})} /></div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-emerald-600">الهوايات</h2>
          <Button onClick={() => setHobbies([...hobbies, { id: Date.now().toString(), name: 'هواية جديدة', icon: '❓', description: 'وصف الهواية' }])} className="!py-2 !px-4 text-xs">إضافة هواية +</Button>
        </div>
        <div className="space-y-4">
          {hobbies.map((h, idx) => (
            <div key={h.id} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl">
              <input className="w-12 text-2xl bg-white border rounded-lg text-center p-2" value={h.icon} onChange={(e) => { const n = [...hobbies]; n[idx].icon = e.target.value; setHobbies(n); }} />
              <input className="flex-1 p-2 bg-white border rounded-lg" value={h.name} onChange={(e) => { const n = [...hobbies]; n[idx].name = e.target.value; setHobbies(n); }} />
              <input className="flex-[2] p-2 bg-white border rounded-lg" value={h.description} onChange={(e) => { const n = [...hobbies]; n[idx].description = e.target.value; setHobbies(n); }} />
              <button onClick={() => setHobbies(hobbies.filter(x => x.id !== h.id))} className="text-rose-500 hover:bg-rose-100 p-2 rounded-lg">🗑️</button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-purple-600">التقييمات</h2></div>
        <div className="space-y-4">
          {evaluations.map((ev, idx) => (
            <div key={ev.id} className="bg-slate-50 p-6 rounded-2xl space-y-3 relative group">
              <button onClick={() => setEvaluations(evaluations.filter(x => x.id !== ev.id))} className="absolute top-4 left-4 text-rose-500 hover:scale-110 transition-all">حذف 🗑️</button>
              <div className="grid md:grid-cols-2 gap-4">
                <input className="p-2 bg-white border rounded-lg font-bold" placeholder="اسم المعلم" value={ev.teacherName} onChange={(e) => { const n = [...evaluations]; n[idx].teacherName = e.target.value; setEvaluations(n); }} />
                <input className="p-2 bg-white border rounded-lg" placeholder="المادة" value={ev.subject} onChange={(e) => { const n = [...evaluations]; n[idx].subject = e.target.value; setEvaluations(n); }} />
              </div>
              <textarea className="w-full p-2 bg-white border rounded-lg resize-none" rows={2} value={ev.comment} onChange={(e) => { const n = [...evaluations]; n[idx].comment = e.target.value; setEvaluations(n); }} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-amber-600">الإنجازات</h2>
          <Button onClick={() => setAchievements([...achievements, { id: Date.now().toString(), title: 'إنجاز جديد', icon: '✨', color: 'bg-slate-100 text-slate-700 border-slate-200', location: 'المكان' }])} className="!py-2 !px-4 text-xs">إضافة إنجاز +</Button>
        </div>
        <div className="space-y-4">
          {achievements.map((a, idx) => (
            <div key={a.id} className="flex flex-wrap gap-4 items-center bg-slate-50 p-4 rounded-2xl">
              <input className="w-12 text-2xl bg-white border rounded-lg text-center p-2" value={a.icon} onChange={(e) => { const n = [...achievements]; n[idx].icon = e.target.value; setAchievements(n); }} />
              <input className="flex-1 min-w-[200px] p-2 bg-white border rounded-lg font-bold" value={a.title} onChange={(e) => { const n = [...achievements]; n[idx].title = e.target.value; setAchievements(n); }} />
              <input className="w-32 p-2 bg-white border rounded-lg" placeholder="السنة" value={a.year || ''} onChange={(e) => { const n = [...achievements]; n[idx].year = e.target.value; setAchievements(n); }} />
              <input className="flex-1 p-2 bg-white border rounded-lg" placeholder="المكان" value={a.location || ''} onChange={(e) => { const n = [...achievements]; n[idx].location = e.target.value; setAchievements(n); }} />
              <button onClick={() => setAchievements(achievements.filter(x => x.id !== a.id))} className="text-rose-500 p-2 rounded-lg">🗑️</button>
            </div>
          ))}
        </div>
      </section>
      
      <div className="text-center pt-6"><Button onClick={() => setCurrentPage(Page.HOME)} className="!px-16 !py-5 text-xl shadow-2xl">حفظ والعودة للرئيسية ✅</Button></div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 selection:bg-sky-100 selection:text-sky-900">
      {/* Pin Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowPinModal(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-sm shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🔒</div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">منطقة محمية</h2>
            <p className="text-slate-500 mb-8">يرجى إدخال الرمز السري للوصول إلى لوحة التحكم</p>
            
            <form onSubmit={verifyPin} className="space-y-6">
              <input 
                type="password" 
                maxLength={4}
                autoFocus
                className={`w-full text-center text-4xl tracking-[1rem] p-4 rounded-2xl bg-black text-sky-400 border-2 transition-all outline-none ${pinError ? 'border-rose-500 animate-bounce' : 'border-slate-800 focus:border-sky-400 shadow-xl'}`}
                placeholder="****"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              />
              {pinError && <p className="text-rose-500 font-bold text-sm">الرمز السري غير صحيح!</p>}
              <Button type="submit" className="w-full !py-4 text-lg">دخول</Button>
            </form>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 px-6 py-4 mb-10 shadow-sm bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage(Page.HOME)}>
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-md">أ</div>
            <span className="text-xl font-black text-slate-800 hidden sm:block">إنجازات الطالب</span>
          </div>
          <div className="flex gap-2">
            <Button variant={currentPage === Page.HOME ? 'primary' : 'ghost'} className="!px-4 !py-2 text-sm" onClick={() => setCurrentPage(Page.HOME)}>الرئيسية</Button>
            <Button variant={currentPage === Page.QUIZ ? 'primary' : 'ghost'} className="!px-4 !py-2 text-sm" onClick={() => setCurrentPage(Page.QUIZ)}>التحدي</Button>
            <Button variant={currentPage === Page.ADMIN ? 'primary' : 'ghost'} className="!px-4 !py-2 text-sm border-2 border-slate-200" onClick={handleAdminAccess}>🛠️ المسؤول</Button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6">
        {currentPage === Page.HOME && renderHome()}
        {currentPage === Page.QUIZ && <QuizGame onBack={() => setCurrentPage(Page.HOME)} />}
        {currentPage === Page.ADMIN && isAdminAuthenticated && renderAdmin()}
      </main>

      <footer className="mt-20 py-10 text-center text-slate-500 text-sm border-t border-sky-100">
        <p>© ٢٠٢٤ ملف إنجاز الطالب {studentName}</p>
        <p className="mt-2">مصمم بكل حب ❤️ لتشجيع الإبداع والتميز</p>
      </footer>
    </div>
  );
};

export default App;
