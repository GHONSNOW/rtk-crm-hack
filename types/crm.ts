export type PipelineStage = 
  | 'LEAD'            // 1. Поиск контакта / Заявка
  | 'MEETING'         // 2. Установочная встреча
  | 'DOCS_SIGNING'    // 3. Согласование и подписание ЭДО
  | 'TEACHER_TRAIN'   // 4. Обучение преподавателей
  | 'PROGRAM_UPDATE'  // 5. Внедрение ПО в программу
  | 'MONITORING';     // 6. Активный поток / Аналитика

export interface University {
  id: string;
  name: string;
  city: string;
  contactPerson: string;
  contactRole: string;
  email: string;
  phone: string;
  productName: string;      // Например: РЕД ОС, Облако РТК
  stage: PipelineStage;
  studentsCount: number;
  groupsCount: number;
  docsStatus: 'ready' | 'pending' | 'signed';
  progress: number;         // 0 - 100%
}