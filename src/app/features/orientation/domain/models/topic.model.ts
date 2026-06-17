export type TopicId =
  | 'corso'
  | 'quiz'
  | 'come-funziona'
  | 'vita'
  | 'sbocchi'
  | 'errori'
  | 'borse-studio'
  | 'costi-geografici';

export type QuestionType = 'single-select' | 'yes-no' | 'scale' | 'yes-no-maybe';

export interface InlineOption {
  value: string;
  label: string;
}

export interface InlineQuestion {
  id: string;
  topicId: TopicId;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: InlineOption[];
  scaleMin?: number;
  scaleMax?: number;
}

export interface TopicModel {
  id: TopicId;
  title: string;
  subtitle: string;
  questions: InlineQuestion[];
}
