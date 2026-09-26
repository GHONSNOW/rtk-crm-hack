import { University } from '../types/crm';

export const INITIAL_UNIVERSITIES: University[] = [
  {
    id: '1',
    name: 'МГТУ им. Н.Э. Баумана',
    city: 'Москва',
    contactPerson: 'Смирнов Алексей Викторович',
    contactRole: 'Декан факультета ИУ',
    email: 'smirnov@bmstu.ru',
    phone: '+7 (499) ***-**-21',
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
    phone: '+7 (812) ***-**-54',
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
    phone: '+7 (872) ***-**-88',
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
    phone: '+7 (495) ***-**-11',
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
    phone: '+7 (863) ***-**-77',
    productName: 'Сетевые технологии Ростелеком',
    stage: 'LEAD',
    studentsCount: 0,
    groupsCount: 0,
    docsStatus: 'pending',
    progress: 15
  }
];