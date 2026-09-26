import { University } from '../types/crm';

export interface EducationProgram {
  id: string;
  name: string;
  universityName: string;
  product: string;
  applicationsCount: number; // Заявки на обучение
  studentsCount: number;     // Количество обучающихся
  streamsCount: number;       // Количество параллельных потоков
  completionRate: number;    // % завершения (LMS)
  demandScore: number;       // Индекс востребованности (0 - 100)
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  ip: string;
  status: 'SUCCESS' | 'WARNING';
}

export const INITIAL_UNIVERSITIES: University[] = [
  {
    id: '1',
    name: 'МГТУ им. Н.Э. Баумана',
    city: 'Москва',
    contactPerson: 'Смирнов Алексей Викторович',
    contactRole: 'Декан факультета ИУ',
    email: 'smirnov@bmstu.ru',
    phone: '+7 (499) 263-**-21',
    productName: 'РТК Кибербезопасность & РЕД ОС',
    stage: 'MONITORING',
    studentsCount: 240,
    groupsCount: 8,
    docsStatus: 'signed',
    progress: 100
  },
  {
    id: '2',
    name: 'СПбПУ Петра Великого',
    city: 'Санкт-Петербург',
    contactPerson: 'Иванова Екатерина Сергеевна',
    contactRole: 'Зав. кафедрой САПР',
    email: 'ivanova@spbstu.ru',
    phone: '+7 (812) 552-**-54',
    productName: 'Облачная инфраструктура РТК',
    stage: 'PROGRAM_UPDATE',
    studentsCount: 160,
    groupsCount: 5,
    docsStatus: 'signed',
    progress: 80
  },
  {
    id: '3',
    name: 'ДГТУ (Махачкала)',
    city: 'Махачкала',
    contactPerson: 'Магомедов Мурад Рашидович',
    contactRole: 'Руководитель ИТ-центра',
    email: 'm.magomedov@dstu.ru',
    phone: '+7 (872) 267-**-88',
    productName: 'РЕД ОС & Офисный пакет',
    stage: 'TEACHER_TRAIN',
    studentsCount: 95,
    groupsCount: 3,
    docsStatus: 'signed',
    progress: 60
  },
  {
    id: '4',
    name: 'НИУ ВШЭ',
    city: 'Москва',
    contactPerson: 'Кузнецов Дмитрий Олегович',
    contactRole: 'Академический руководитель',
    email: 'dkuznetsov@hse.ru',
    phone: '+7 (495) 772-**-11',
    productName: 'Аналитика больших данных РТК',
    stage: 'DOCS_SIGNING',
    studentsCount: 120,
    groupsCount: 4,
    docsStatus: 'pending',
    progress: 40
  },
  {
    id: '5',
    name: 'ЮФУ (Ростов-на-Дону)',
    city: 'Ростов-на-Дону',
    contactPerson: 'Васильев Игорь Павлович',
    contactRole: 'Зам. директора ИКТИБ',
    email: 'vasiliev@sfedu.ru',
    phone: '+7 (863) 218-**-77',
    productName: 'Сетевые технологии Ростелеком',
    stage: 'LEAD',
    studentsCount: 0,
    groupsCount: 0,
    docsStatus: 'pending',
    progress: 15
  }
];

export const INITIAL_PROGRAMS: EducationProgram[] = [
  {
    id: 'p1',
    name: 'Информационная безопасность и защита КИИ',
    universityName: 'МГТУ им. Н.Э. Баумана',
    product: 'РТК Кибербезопасность',
    applicationsCount: 480,
    studentsCount: 240,
    streamsCount: 8,
    completionRate: 94,
    demandScore: 98
  },
  {
    id: 'p2',
    name: 'Облачные сервисы и виртуализация инфраструктуры',
    universityName: 'СПбПУ Петра Великого',
    product: 'Облако РТК',
    applicationsCount: 310,
    studentsCount: 160,
    streamsCount: 5,
    completionRate: 88,
    demandScore: 89
  },
  {
    id: 'p3',
    name: 'Администрирование отечественных ОС в госсекторе',
    universityName: 'ДГТУ (Махачкала)',
    product: 'РЕД ОС',
    applicationsCount: 190,
    studentsCount: 95,
    streamsCount: 3,
    completionRate: 82,
    demandScore: 78
  },
  {
    id: 'p4',
    name: 'Инженерия корпоративных данных и Big Data',
    universityName: 'НИУ ВШЭ',
    product: 'Платформа Данных РТК',
    applicationsCount: 260,
    studentsCount: 120,
    streamsCount: 4,
    completionRate: 91,
    demandScore: 85
  }
];

export const INITIAL_LOGS: SecurityLog[] = [
  {
    id: 'log-1',
    timestamp: '26.09.2026 17:42',
    actor: 'Куратор РТК (Иванов А.)',
    role: 'Оператор PRM',
    action: 'Маскирование ПДн преподавателей кафедры САПР',
    ip: '10.240.12.4',
    status: 'SUCCESS'
  },
  {
    id: 'log-2',
    timestamp: '26.09.2026 16:15',
    actor: 'LMS Sync Webhook',
    role: 'Служебный аккаунт API',
    action: 'Синхронизация потоков студентов ДГТУ (95 уч.)',
    ip: '192.168.1.50',
    status: 'SUCCESS'
  },
  {
    id: 'log-3',
    timestamp: '26.09.2026 14:02',
    actor: 'Декан (Смирнов А.В.)',
    role: 'Представитель вуза',
    action: 'Подписание доп. соглашения через КЭП/Диадок',
    ip: '178.62.201.88',
    status: 'SUCCESS'
  }
];