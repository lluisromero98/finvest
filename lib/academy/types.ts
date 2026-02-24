export interface Lesson {
  id: string;
  moduleId: string;
  title: {
    es: string;
    en: string;
    ca: string;
  };
  description: {
    es: string;
    en: string;
    ca: string;
  };
  sections: LessonSection[];
  keyTakeaways: {
    es: string[];
    en: string[];
    ca: string[];
  };
  whenToBuy: {
    es: string[];
    en: string[];
    ca: string[];
  };
  whenToSell: {
    es: string[];
    en: string[];
    ca: string[];
  };
  diagram?: string; // component name for the diagram
}

export interface LessonSection {
  title: {
    es: string;
    en: string;
    ca: string;
  };
  content: {
    es: string;
    en: string;
    ca: string;
  };
}

export interface Module {
  id: string;
  index: number;
  title: {
    es: string;
    en: string;
    ca: string;
  };
  description: {
    es: string;
    en: string;
    ca: string;
  };
  color: string;
  icon: string;
  lessons: Lesson[];
}
