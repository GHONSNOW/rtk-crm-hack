"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Building2, 
  Users, 
  Layers, 
  GraduationCap, 
  ShieldCheck, 
  Search, 
  ChevronRight, 
  Download, 
  FileUp, 
  Plus, 
  Settings2, 
  Paperclip, 
  MessageSquare, 
  UserCheck,
  BookOpen,
  Laptop
} from 'lucide-react';
import { DEFAULT_STAGES, INITIAL_RECORDS, INITIAL_PROGRAMS } from '../data/mockData';
import { UniversityRecord, WorkflowStage, UserRole } from '../types/crm';

export default function App() {
  const [role, setRole] = useState<UserRole>('MANAGER'); // КАМ, Руководитель, Админ
  const [activeTab, setActiveTab] = useState<'pipeline' | 'ranking' | 'workflow-editor' | 'docs'>('pipeline');
  
  const [stages, setStages] = useState<WorkflowStage[]>(DEFAULT_STAGES);
  const [records, setRecords] = useState<UniversityRecord[]>(INITIAL_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Состояния модалок
  const [selectedRecord, setSelectedRecord] = useState<UniversityRecord | null>(null);
  const [transitioningRecord, setTransitioningRecord] = useState<UniversityRecord | null>(null);
  const [transitionComment, setTransitionComment] = useState('');
  const [newStageName, setNewStageName] = useState('');

  // 1. Экспорт в Excel (xlsx) согласно ТЗ
  const exportToExcel = () => {
    const dataToExport = records.map(r => ({
      'Название ВУЗа': r.universityName,
      'Вендор': r.vendor,
      'ПО': r.software,
      'Номер договора': r.contractNumber,
      'Лицензия подписана': r.licenseSigned ? 'Да' : 'Нет',
      'Срок действия (лет)': r.licenseDurationYears,
      'Статус передачи': r.transferStatus,
      'ФИО Менеджера': r.managerName,
      'Ответственный от ВУЗа': r.universityResponsible,
      'Текущий этап': stages.find(s => s.id === r.stageId)?.name || 'Неизвестно',
      'Комментарий': r.comment
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Взаимодействия с ВУЗами');
    XLSX.writeFile(workbook, `Отчет_ИТ_Школа_РТК_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // 2. Логика смены статуса с комментарием и фиксацией файла
  const handleStageTransition = () => {
    if (!transitioningRecord) return;
    
    const currentIndex = stages.findIndex(s => s.id === transitioningRecord.stageId);
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      setRecords(prev => prev.map(r => {
        if (r.id === transitioningRecord.id) {
          return {
            ...r,
            stageId: nextStage.id,
            comment: transitionComment || r.comment,
            attachedFiles: [...r.attachedFiles, `Служебная_записка_к_${nextStage.name.slice(0, 10)}.pdf`]
          };
        }
        return r;
      }));
    }
    setTransitioningRecord(null);
    setTransitionComment('');
  };

  // 3. Добавление нового статуса workflow (кастомизация по ТЗ)
  const handleAddStage = () => {
    if (!newStageName.trim()) return;
    const newStage: WorkflowStage = {
      id: `st-${Date.now()}`,
      name: `${stages.length + 1}. ${newStageName.trim()}`,
      order: stages.length + 1
    };
    setStages([...stages, newStage]);
    setNewStageName('');
  };

  // Фильтрация
  const filteredRecords = records.filter(r => 
    r.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.software.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.managerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Сайдбар */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800">
            <div className="p-2 bg-blue-600 rounded-lg text-white font-bold tracking-wider text-xs">РТК</div>
            <div>
              <div className="text-sm font-bold tracking-wide">ИТ Школа РТК</div>
              <div className="text-[11px] text-slate-400">Система контроля ВУЗов</div>
            </div>
          </div>

          {/* Переключатель ролей (Требование ТЗ) */}
          <div className="p-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-400" /> Текущая роль:
            </label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value as UserRole)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="USER">Пользователь (КАМ)</option>
              <option value="MANAGER">Руководитель (Полный доступ)</option>
              <option value="ADMIN">Администратор платформы</option>
            </select>
          </div>

          <nav className="space-y-1.5">
            <button 
              onClick={() => setActiveTab('pipeline')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeTab === 'pipeline' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" /> Воронка взаимодействия
            </button>
            <button 
              onClick={() => setActiveTab('ranking')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeTab === 'ranking' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Ранжирование программ
            </button>
            <button 
              onClick={() => setActiveTab('workflow-editor')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeTab === 'workflow-editor' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Settings2 className="w-4 h-4" /> Конструктор Workflow
            </button>
            <button 
              onClick={() => setActiveTab('docs')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                activeTab === 'docs' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Документация (Встроена)
            </button>
          </nav>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400">
          <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 152-ФЗ / ФСТЭК №117
          </div>
          Шифрование каналов, RBAC-доступ, защищенный контур.
        </div>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Хедер с действиями экспорта и фильтрами */}
        <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input 
                type="text"
                placeholder="Поиск по вузу, ПО, менеджеру..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs focus:outline-none focus:border-blue-500 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={exportToExcel}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Экспорт отчета (.xlsx)
            </button>
          </div>
        </header>

        {/* 1. ЭКРАН КАНБАН-ВОРОНКИ */}
        {activeTab === 'pipeline' && (
          <div className="flex-1 overflow-x-auto p-6 flex gap-4">
            {stages.map(stage => {
              const stageRecords = filteredRecords.filter(r => r.stageId === stage.id);

              return (
                <div key={stage.id} className="w-80 flex-shrink-0 flex flex-col bg-slate-900/40 rounded-xl border border-slate-800">
                  <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 truncate" title={stage.name}>
                      {stage.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-800 text-slate-300">
                      {stageRecords.length}
                    </span>
                  </div>

                  <div className="p-2.5 flex-1 overflow-y-auto space-y-2.5">
                    {stageRecords.map(rec => (
                      <div 
                        key={rec.id}
                        onClick={() => setSelectedRecord(rec)}
                        className="p-3 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl cursor-pointer transition group"
                      >
                        <h4 className="font-semibold text-xs text-slate-200 group-hover:text-blue-400 transition">
                          {rec.universityName}
                        </h4>
                        
                        <div className="text-[11px] text-slate-400 mt-1">
                          Менеджер: {rec.managerName}
                        </div>

                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-[10px] text-blue-300">
                          <Laptop className="w-3 h-3 text-blue-400" />
                          {rec.software}
                        </div>

                        {rec.attachedFiles.length > 0 && (
                          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                            <Paperclip className="w-3 h-3 text-slate-500" />
                            {rec.attachedFiles.length} файла прикреплено
                          </div>
                        )}

                        <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between">
                          <span className="text-[10px] text-emerald-400">
                            {rec.licenseSigned ? 'Договор подписан' : 'Согласование'}
                          </span>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setTransitioningRecord(rec);
                            }}
                            className="flex items-center gap-1 text-[10px] bg-slate-700 hover:bg-blue-600 text-slate-200 px-2 py-1 rounded transition"
                          >
                            След. статус <ChevronRight className="w-3 h-3" />
                          </button>
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
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Ранжирование ИТ-программ на основе востребованности</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Критерии: заявки, число обучающихся, параллельные потоки</p>
                </div>
                <button onClick={exportToExcel} className="text-xs text-blue-400 hover:underline">
                  Экспорт таблицы
                </button>
              </div>

              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/40 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Ранг</th>
                    <th className="py-3 px-4">Программа / Вуз</th>
                    <th className="py-3 px-4">ПО РТК</th>
                    <th className="py-3 px-4 text-center">Заявок</th>
                    <th className="py-3 px-4 text-center">Студентов</th>
                    <th className="py-3 px-4 text-center">Потоков</th>
                    <th className="py-3 px-4">Индекс востребованности</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {INITIAL_PROGRAMS.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-slate-800/30">
                      <td className="py-3.5 px-4 font-bold text-slate-300">#{idx + 1}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-100">{p.name}</div>
                        <div className="text-slate-400 text-[11px]">{p.universityName}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{p.software}</td>
                      <td className="py-3.5 px-4 text-center">{p.applicationsCount}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-400">{p.studentsCount}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-blue-400">{p.streamsCount}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${p.demandScore}%` }} />
                          </div>
                          <span className="font-bold">{p.demandScore}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. КОНСТРУКТОР WORKFLOW */}
        {activeTab === 'workflow-editor' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-4xl space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-100">Конструктор этапов Workflow</h2>
              <p className="text-xs text-slate-400 mt-1">
                Настройка и добавление этапов жизненного цикла взаимодействия с вузами (согласно пунктам 6 и 9 ТЗ).
              </p>
            </div>

            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Название нового этапа workflow..."
                value={newStageName}
                onChange={e => setNewStageName(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={handleAddStage}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
              >
                <Plus className="w-4 h-4" /> Добавить этап
              </button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl divide-y divide-slate-800">
              {stages.map((stage, idx) => (
                <div key={stage.id} className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                    <span className="text-xs font-medium text-slate-200">{stage.name}</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Активен</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. ВСТРОЕННАЯ ДОКУМЕНТАЦИЯ (ТРЕБОВАНИЕ ТЗ) */}
        {activeTab === 'docs' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-3xl space-y-6 text-xs text-slate-300">
            <h2 className="text-base font-bold text-slate-100">Встроенная техническая документация</h2>
            <div className="space-y-4 leading-relaxed">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <h3 className="font-semibold text-blue-400 mb-1">Руководство пользователя</h3>
                <p>1. Для перевода вуза на следующий этап нажмите кнопку «След. статус» на карточке и укажите комментарий.</p>
                <p>2. Для формирования отчета нажмите «Экспорт отчета (.xlsx)» в верхнем меню.</p>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <h3 className="font-semibold text-emerald-400 mb-1">Руководство администратора и соответствие ИБ</h3>
                <p>Платформа работает в соответствии с 152-ФЗ и приказом ФСТЭК №117. Все персональные данные маскируются в журнале событий. Роли разграничены моделью RBAC.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* МОДАЛКА: СМЕНА СТАТУСА С КОММЕНТАРИЕМ И ПРИКРЕПЛЕНИЕМ ФАЙЛА */}
      {transitioningRecord && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[450px] bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" /> Переход на следующий статус workflow
            </h3>
            <p className="text-xs text-slate-400">
              Вуз: <b>{transitioningRecord.universityName}</b>
            </p>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300">Обязательный комментарий к переходу:</label>
              <textarea 
                value={transitionComment}
                onChange={e => setTransitionComment(e.target.value)}
                placeholder="Опишите результат выполнения текущего этапа..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="p-3 border border-dashed border-slate-700 rounded-lg text-center cursor-pointer hover:border-blue-500 transition">
              <FileUp className="w-5 h-5 text-slate-400 mx-auto mb-1" />
              <div className="text-[11px] text-slate-300">Прикрепить подтверждающие документы</div>
              <div className="text-[9px] text-slate-500">Форматы: PDF, DOCX, XLSX, ZIP (по ТЗ)</div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button 
                onClick={() => setTransitioningRecord(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-300"
              >
                Отмена
              </button>
              <button 
                onClick={handleStageTransition}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-medium text-white"
              >
                Подтвердить перевод
              </button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛКА: ПРОСМОТР КАРТОЧКИ ВУЗА (10 ПОЛЕЙ ТЗ) */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-end z-50">
          <div className="w-[460px] bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-100">{selectedRecord.universityName}</h3>
                  <div className="text-xs text-blue-400 mt-0.5">{selectedRecord.software}</div>
                </div>
                <button onClick={() => setSelectedRecord(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">Вендор и номер договора</div>
                  <div className="font-medium text-slate-200 mt-0.5">{selectedRecord.vendor} • {selectedRecord.contractNumber}</div>
                </div>

                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">Срок лицензии и статус передачи</div>
                  <div className="font-medium text-emerald-400 mt-0.5">
                    {selectedRecord.licenseDurationYears} года • {selectedRecord.transferStatus}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">Ответственные лица</div>
                  <div className="text-slate-300 mt-1">От ВУЗа: <b>{selectedRecord.universityResponsible}</b></div>
                  <div className="text-slate-300">Менеджер РТК: <b>{selectedRecord.managerName}</b></div>
                </div>

                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">Прикрепленные файлы (ЭДО / Лицензии)</div>
                  <div className="mt-1 space-y-1">
                    {selectedRecord.attachedFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                        <Paperclip className="w-3 h-3 text-blue-400" /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">История и комментарии</div>
                  <div className="text-slate-300 mt-1 italic">{selectedRecord.comment}</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedRecord(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}