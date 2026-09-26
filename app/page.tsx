"use client";

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  FileCheck2, 
  Layers, 
  ShieldCheck, 
  Search, 
  GraduationCap, 
  ChevronRight, 
  Laptop,
  RefreshCw,
  TrendingUp,
  Plus,
  Lock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { INITIAL_UNIVERSITIES, INITIAL_PROGRAMS, INITIAL_LOGS, EducationProgram } from '../data/mockData';
import { PipelineStage, University } from '../types/crm';

const STAGES: { key: PipelineStage; label: string; countColor: string }[] = [
  { key: 'LEAD', label: '1. Контакт / Заявка', countColor: 'bg-slate-700' },
  { key: 'MEETING', label: '2. Переговоры', countColor: 'bg-blue-900' },
  { key: 'DOCS_SIGNING', label: '3. Согласование ЭДО', countColor: 'bg-amber-900' },
  { key: 'TEACHER_TRAIN', label: '4. Обучение педагогов', countColor: 'bg-purple-900' },
  { key: 'PROGRAM_UPDATE', label: '5. Внедрение в курс', countColor: 'bg-indigo-900' },
  { key: 'MONITORING', label: '6. Аналитика и LMS', countColor: 'bg-emerald-900' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'ranking' | 'security'>('pipeline');
  const [universities, setUniversities] = useState<University[]>(INITIAL_UNIVERSITIES);
  const [programs, setPrograms] = useState<EducationProgram[]>(INITIAL_PROGRAMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState(false);

  const filteredUnis = universities.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = universities.reduce((acc, u) => acc + u.studentsCount, 0);

  // Перемещение карточки на следующий этап
  const moveNextStage = (id: string, currentStage: PipelineStage) => {
    const stageOrder: PipelineStage[] = ['LEAD', 'MEETING', 'DOCS_SIGNING', 'TEACHER_TRAIN', 'PROGRAM_UPDATE', 'MONITORING'];
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex < stageOrder.length - 1) {
      const nextStage = stageOrder[currentIndex + 1];
      setUniversities(prev => prev.map(u => u.id === id ? { ...u, stage: nextStage } : u));
    }
  };

  // Эмуляция интеграции с LMS по API
  const handleLmsSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncToast(true);
      // Добавляем студентов по результатам симуляции
      setUniversities(prev => prev.map(u => u.id === '3' ? { ...u, studentsCount: u.studentsCount + 25 } : u));
      setTimeout(() => setSyncToast(false), 3500);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Сайдбар */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800">
            <div className="p-2 bg-blue-600 rounded-lg text-white font-bold tracking-wider">РТК</div>
            <div>
              <div className="text-sm font-bold tracking-wide">ИТ Школа РТК</div>
              <div className="text-xs text-slate-400">PRM & Мониторинг вузов</div>
            </div>
          </div>

          <nav className="mt-6 space-y-1.5">
            <button 
              onClick={() => setActiveTab('pipeline')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'pipeline' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" /> Воронка внедрения
            </button>
            <button 
              onClick={() => setActiveTab('ranking')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'ranking' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Рейтинг программ
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'security' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Аудит 152-ФЗ / ФСТЭК
            </button>
          </nav>
        </div>

        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
          <div className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" /> Защищенный контур
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Приказ ФСТЭК №117/21. Персональные данные обезличены.
          </p>
        </div>
      </aside>

      {/* Основная область */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Хедер */}
        <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-semibold text-slate-100">
              {activeTab === 'pipeline' && 'Жизненный цикл интеграции программ (14 этапов в 6 шагов)'}
              {activeTab === 'ranking' && 'Объективное ранжирование программ по востребованности'}
              {activeTab === 'security' && 'Журнал событий информационной безопасности (152-ФЗ)'}
            </h1>
            {activeTab === 'pipeline' && (
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Поиск по вузу, городу, продукту..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button 
              onClick={handleLmsSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Синхронизация...' : 'Синхронизация с LMS'}
            </button>

            <div className="h-5 w-px bg-slate-800" />

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Студентов в пуле: <b>{totalStudents}</b></span>
            </div>
          </div>
        </header>

        {/* Уведомление о синхронизации */}
        {syncToast && (
          <div className="bg-emerald-950/80 border-b border-emerald-800/50 px-6 py-2 text-xs text-emerald-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Данные из LMS успешно получены по API: обновлена успеваемость и добавлены новые студенты в поток ДГТУ (+25 чел.)
            </span>
            <span className="text-[10px] text-emerald-400/80">Статус: 200 OK</span>
          </div>
        )}

        {/* 1. ЭКРАН ВОРОНКИ (КАНБАН) */}
        {activeTab === 'pipeline' && (
          <div className="flex-1 overflow-x-auto p-6 flex gap-4">
            {STAGES.map(stage => {
              const stageUnis = filteredUnis.filter(u => u.stage === stage.key);

              return (
                <div key={stage.key} className="w-80 flex-shrink-0 flex flex-col bg-slate-900/40 rounded-xl border border-slate-800">
                  <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">{stage.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold text-slate-200 ${stage.countColor}`}>
                      {stageUnis.length}
                    </span>
                  </div>

                  <div className="p-2.5 flex-1 overflow-y-auto space-y-2.5">
                    {stageUnis.map(uni => (
                      <div 
                        key={uni.id}
                        onClick={() => setSelectedUni(uni)}
                        className="p-3.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl cursor-pointer transition shadow-sm group"
                      >
                        <h3 className="font-semibold text-sm text-slate-200 group-hover:text-blue-400 transition leading-tight">
                          {uni.name}
                        </h3>
                        
                        <div className="text-xs text-slate-400 mt-1">
                          {uni.city} • {uni.contactPerson.split(' ')[0]}
                        </div>

                        <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-950/60 border border-blue-800/40 text-[11px] text-blue-300">
                          <Laptop className="w-3 h-3 text-blue-400" />
                          {uni.productName}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
                          <div>{uni.studentsCount > 0 ? `${uni.studentsCount} студ.` : 'Формирование'}</div>
                          {stage.key !== 'MONITORING' && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                moveNextStage(uni.id, uni.stage);
                              }}
                              className="flex items-center gap-1 text-[11px] bg-slate-700 hover:bg-blue-600 text-slate-200 hover:text-white px-2 py-1 rounded transition"
                            >
                              Далее <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. ЭКРАН РАНЖИРОВАНИЯ ОБРАЗОВАТЕЛЬНЫХ ПРОГРАММ */}
        {activeTab === 'ranking' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="text-xs text-slate-400">Лидер востребованности</div>
                <div className="text-lg font-bold text-blue-400 mt-1">Информационная безопасность</div>
                <div className="text-xs text-slate-500 mt-1">МГТУ Баумана (Рейтинг 98/100)</div>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="text-xs text-slate-400">Конкурс на место</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">2.1 заявки на студента</div>
                <div className="text-xs text-slate-500 mt-1">Средний конкурс по всем вузам</div>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="text-xs text-slate-400">Средняя доходимость (LMS)</div>
                <div className="text-lg font-bold text-indigo-400 mt-1">88.7% завершения</div>
                <div className="text-xs text-slate-500 mt-1">Высокий показатель удержания</div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-bold text-slate-200">Таблица ранжирования программ по метрикам ТЗ</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Критерии: поданные заявки, контингент студентов, параллельные потоки</p>
                </div>
                <span className="text-xs bg-blue-900/50 text-blue-300 border border-blue-700/50 px-2.5 py-1 rounded-full font-medium">
                  Алгоритм взвешенного скоринга РТК
                </span>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/40 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Ранг</th>
                    <th className="py-3 px-4">Образовательная программа / Вуз</th>
                    <th className="py-3 px-4">ИТ-продукт РТК</th>
                    <th className="py-3 px-4 text-center">Заявок</th>
                    <th className="py-3 px-4 text-center">Студентов</th>
                    <th className="py-3 px-4 text-center">Потоков</th>
                    <th className="py-3 px-4">Индекс востребованности</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {programs.map((prog, idx) => (
                    <tr key={prog.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-300">#{idx + 1}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-100 text-sm">{prog.name}</div>
                        <div className="text-slate-400 text-[11px]">{prog.universityName}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">
                          {prog.product}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-medium text-slate-300">{prog.applicationsCount}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-400">{prog.studentsCount}</td>
                      <td className="py-3.5 px-4 text-center font-medium text-blue-400">{prog.streamsCount}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-blue-500 h-full rounded-full" 
                              style={{ width: `${prog.demandScore}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-200">{prog.demandScore}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ЭКРАН БЕЗОПАСНОСТИ 152-ФЗ / ФСТЭК */}
        {activeTab === 'security' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-emerald-300">Требования 152-ФЗ и приказа ФСТЭК соблюдены</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Все персональные данные преподавателей и представителей вузов хранятся в зашифрованном виде. 
                  Телефоны и email маскируются в интерфейсе оператора. Ведется неизменяемый аудит-лог каждого действия.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h2 className="text-sm font-bold text-slate-200">Неизменяемый журнал аудита событий (Security Event Log)</h2>
                <p className="text-xs text-slate-400 mt-0.5">Фиксация обращений к персональным данным и вызовов API</p>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/40 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Время</th>
                    <th className="py-3 px-4">Оператор / Инициатор</th>
                    <th className="py-3 px-4">Роль (RBAC)</th>
                    <th className="py-3 px-4">Действие</th>
                    <th className="py-3 px-4">IP-адрес</th>
                    <th className="py-3 px-4 text-center">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {INITIAL_LOGS.map(log => (
                    <tr key={log.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3.5 px-4 text-slate-400">{log.timestamp}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-200">{log.actor}</td>
                      <td className="py-3.5 px-4 text-slate-400">{log.role}</td>
                      <td className="py-3.5 px-4 text-slate-300">{log.action}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">{log.ip}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800/50 rounded font-semibold text-[10px]">
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Модальное окно вуза */}
      {selectedUni && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end z-50">
          <div className="w-[450px] bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-100">{selectedUni.name}</h2>
                  <p className="text-xs text-slate-400">{selectedUni.city}</p>
                </div>
                <button 
                  onClick={() => setSelectedUni(null)} 
                  className="text-slate-400 hover:text-white text-lg font-bold px-2 py-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-500 mb-1">Продукт и лицензии РТК</div>
                  <div className="font-semibold text-blue-400">{selectedUni.productName}</div>
                </div>

                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-500 mb-1">Контактное лицо (152-ФЗ Protected)</div>
                  <div className="font-medium text-slate-200">{selectedUni.contactPerson}</div>
                  <div className="text-xs text-slate-400">{selectedUni.contactRole}</div>
                  <div className="mt-2 text-xs text-slate-300 font-mono">Email: {selectedUni.email}</div>
                  <div className="text-xs text-slate-300 font-mono">Тел: {selectedUni.phone}</div>
                </div>

                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-500 mb-1">Статус документооборота (ЭДО)</div>
                  <div className="flex items-center gap-2 mt-1">
                    <FileCheck2 className={`w-4 h-4 ${selectedUni.docsStatus === 'signed' ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span className="font-medium">
                      {selectedUni.docsStatus === 'signed' ? 'Договор подписан через ЭДО' : 'На согласовании'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedUni(null)} 
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition"
            >
              Закрыть карточку
            </button>
          </div>
        </div>
      )}
    </div>
  );
}