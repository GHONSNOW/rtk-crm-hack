export type UserRole = 'USER' | 'MANAGER' | 'ADMIN'; // КАМ, Руководитель, Админ

export interface WorkflowStage {
  id: string;
  name: string;
  order: number;
}

export interface UniversityRecord {
  id: string;
  universityName: string;    // Название ВУЗа
  vendor: string;            // Вендор (напр. Ростелеком, РЕД СОФТ)
  software: string;          // ПО
  contractNumber: string;    // Номер договора
  licenseSigned: boolean;    // Подписание лицензии
  licenseDurationYears: number; // Срок действия лицензии (год)
  transferStatus: string;    // Статус по передачи
  managerName: string;       // ФИО Менеджера (КАМ)
  universityResponsible: string; // Ответственные от ВУЗа
  comment: string;           // Комментарий
  stageId: string;           // Текущий статус workflow
  attachedFiles: string[];   // Прикрепленные файлы
}

export interface EducationProgramMetric {
  id: string;
  name: string;
  universityName: string;
  software: string;
  applicationsCount: number; // Заявки на обучение
  studentsCount: number;     // Количество обучающихся
  streamsCount: number;      // Количество параллельных потоков
  demandScore: number;       // Индекс востребованности
}