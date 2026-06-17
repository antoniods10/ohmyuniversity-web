import { TopicId } from './topic.model';

export interface QuizAnswer {
  questionId: string;
  topicId: TopicId;
  value: string;
}
