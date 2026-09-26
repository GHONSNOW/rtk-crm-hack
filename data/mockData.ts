import { UniversityRecord, WorkflowStage, EducationProgramMetric } from '../types/crm';

// Базовый Workflow из 14 пунктов ТЗ
export const DEFAULT_STAGES: WorkflowStage[] = [
  { id: 'st-1', name: '1. Поиск контактов', order: 1 },
  { id: 'st-2', name: '2. Уточнение программ', order: 2 },
  { id: 'st-3', name: '3. Встреча с вузом', order: 3 },
  { id: 'st-4', name: '4. Обмен документами', order: 4 },
  { id: 'st-5', name: '5. Корректировка документов', order: 5 },
  { id: 'st-6', name: '6. Подписание ЭДО', order: 6 },
  { id: 'st-7', name: '7. Передача лицензий ПО', order: 7 },
  { id: 'st-8', name: '8. Сопровождение внедрения', order: 8 },
  { id: 'st-9', name: '9. Обучение преподавателей', order: 9 },
  { id: 'st-10', name: '10. Актуализация программы', order: 10 },
  { id: 'st-11', name: '11. Ведение занятий', order: 11 },
  { id: 'st-12', name: '12. Обновление документации', order: 12 },
  { id: 'st-13', name: '13. Повышение квалификации', order: 13 },
  { id: 'st-14', name: '14. Контроль и аналитика', order: 14 },
];

export const INITIAL_RECORDS: UniversityRecord[] = [
  {
    id: 'rec-1',
    universityName: 'МГТУ им. Н.Э. Баумана',
    vendor: 'Ростелеком Солар / РЕД СОФТ',
    software: 'РТК Кибербезопасность & РЕД ОС',
    contractNumber: 'РТК-2026/ЭДО-441',
    licenseSigned: true,
    licenseDurationYears: 3,
    transferStatus: 'Передано полностью',
    managerName: 'Иванов А.А. (КАМ)',
    universityResponsible: 'Смирнов А.В. (Декан ИУ)',
    comment: 'Курс интегрирован в весенний семестр.',
    stageId: 'st-11',
    attachedFiles: ['Соглашение_Бауманка_подписано.pdf', 'Реестр_лицензий.xlsx']
  },
  {
    id: 'rec-2',
    universityName: 'СПбПУ Петра Великого',
    vendor: 'Ростелеком ЦОД',
    software: 'Облачная платформа РТК',
    contractNumber: 'РТК-2026/СПБ-109',
    licenseSigned: true,
    licenseDurationYears: 2,
    transferStatus: 'Активация стендов',
    managerName: 'Петрова М.С. (КАМ)',
    universityResponsible: 'Иванова Е.С. (Зав. каф. САПР)',
    comment: 'Преподаватели проходят тестовое развертывание.',
    stageId: 'st-9',
    attachedFiles: ['Акт_приема_передачи.pdf']
  },
  {
    id: 'rec-3',
    universityName: 'ДГТУ (Махачкала)',
    vendor: 'РТК / РЕД СОФТ',
    software: 'РЕД ОС & МойОфис',
    contractNumber: 'РТК-2026/СКФО-08',
    licenseSigned: true,
    licenseDurationYears: 1,
    transferStatus: 'Обучение кафедры',
    managerName: 'Халилов Р.А. (КАМ)',
    universityResponsible: 'Магомедов М.Р. (ИТ-центр)',
    comment: 'Завершено 2 потока переподготовки педагогов.',
    stageId: 'st-9',
    attachedFiles: ['Список_преподавателей.xlsx']
  },
  {
    id: 'rec-4',
    universityName: 'НИУ ВШЭ',
    vendor: 'Ростелеком Данные',
    software: 'Платформа Big Data РТК',
    contractNumber: 'РТК-2026/ВШЭ-33',
    licenseSigned: false,
    licenseDurationYears: 1,
    transferStatus: 'Согласование проекта договора',
    managerName: 'Иванов А.А. (КАМ)',
    universityResponsible: 'Кузнецов Д.О. (Академ. рук.)',
    comment: 'Ожидается согласование юристов вуза.',
    stageId: 'st-5',
    attachedFiles: ['Проект_договора_правки.docx']
  }
];

export const INITIAL_PROGRAMS: EducationProgramMetric[] = [
  {
    id: 'p1',
    name: 'Информационная безопасность и защита КИИ',
    universityName: 'МГТУ им. Н.Э. Баумана',
    software: 'РТК Кибербезопасность',
    applicationsCount: 480,
    studentsCount: 240,
    streamsCount: 8,
    demandScore: 98
  },
  {
    id: 'p2',
    name: 'Облачные сервисы и виртуализация',
    universityName: 'СПбПУ Петра Великого',
    software: 'Облако РТК',
    applicationsCount: 310,
    studentsCount: 160,
    streamsCount: 5,
    demandScore: 89
  },
  {
    id: 'p3',
    name: 'Администрирование отечественных ОС',
    universityName: 'ДГТУ (Махачкала)',
    software: 'РЕД ОС',
    applicationsCount: 190,
    studentsCount: 95,
    streamsCount: 3,
    demandScore: 78
  }
];