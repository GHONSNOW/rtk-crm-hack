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
  Laptop
} from 'lucide-react';
import { INITIAL_UNIVERSITIES } from '../data/mockData';
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
  const [universities, setUniversities] = useState<University[]>(INITIAL_UNIVERSITIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUni, setSelectedUni] = useState<University | null>(null);

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

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Сайдбар */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800">
            <div className="p-2 bg-blue-600 rounded-lg text-white font-bold">РТК</div>
            <div>
              <div className="text-sm font-bold tracking-wide">ИТ Школа РТК</div>
              <div className="text-xs text-slate-400">PRM-система вузов</div>
            </div>
          </div>

          <nav className="mt-6 space-y-1.5">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600/20 text-blue-400 text-sm font-medium">
              <Layers className="w-4 h-4" /> Воронка внедрения
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 text-sm font-medium transition">
              <GraduationCap className="w-4 h-4" /> Рейтинг программ
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 text-sm font-medium transition">
              <ShieldCheck className="w-4 h-4" /> Аудит 152-ФЗ / ФСТЭК
            </button>
          </nav>
        </div>

        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400">
          <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Контур защиты
          </div>
          152-ФЗ активен. Все персональные данные маскированы.
        </div>
      </aside>

      {/* Основная рабочая область */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Верхняя плашка */}
        <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/30">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Жизненный цикл интеграции программ</h1>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input 
                type="text"
                placeholder="Поиск по вузу, городу, продукту..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-72"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Вузов в работе: <b>{universities.length}</b></span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Обучается студентов: <b>{totalStudents}</b></span>
            </div>
          </div>
        </header>

        {/* Канбан-доска */}
        <div className="flex-1 overflow-x-auto p-6 flex gap-4">
          {STAGES.map(stage => {
            const stageUnis = filteredUnis.filter(u => u.stage === stage.key);

            return (
              <div key={stage.key} className="w-80 flex-shrink-0 flex flex-col bg-slate-900/40 rounded-xl border border-slate-800">
                {/* Заголовок колонки */}
                <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">{stage.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold text-slate-200 ${stage.countColor}`}>
                    {stageUnis.length}
                  </span>
                </div>

                {/* Карточки в колонке */}
                <div className="p-2.5 flex-1 overflow-y-auto space-y-2.5">
                  {stageUnis.map(uni => (
                    <div 
                      key={uni.id}
                      onClick={() => setSelectedUni(uni)}
                      className="p-3.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl cursor-pointer transition shadow-sm group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm text-slate-200 group-hover:text-blue-400 transition leading-tight">
                          {uni.name}
                        </h3>
                      </div>
                      
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <span>{uni.city}</span> • <span>{uni.contactPerson.split(' ')[0]}</span>
                      </div>

                      <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-950/60 border border-blue-800/40 text-[11px] text-blue-300">
                        <Laptop className="w-3 h-3 text-blue-400" />
                        {uni.productName}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
                        <div>{uni.studentsCount > 0 ? `${uni.studentsCount} студ.` : 'Подготовка'}</div>
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
      </main>

      {/* Модальное окно деталей вуза */}
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
                  <div className="mt-2 text-xs text-slate-300">Email: {selectedUni.email}</div>
                  <div className="text-xs text-slate-300">Тел: {selectedUni.phone}</div>
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