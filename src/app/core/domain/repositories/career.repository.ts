import { Observable } from 'rxjs';
import { TranscriptResponse } from '../models/career/transcript.model';
import { GradesResponse } from '../models/career/grades.model';
import { StudyPlanResponse } from '../models/career/study-plan.model';
import { ExamHistoryResponse } from '../models/career/exam-history.model';
import { RecommendationsResponse } from '../models/career/recommendations.model';

export abstract class CareerRepository {
  abstract getTranscript(): Observable<TranscriptResponse>;
  abstract getGrades(): Observable<GradesResponse>;
  abstract getStudyPlan(): Observable<StudyPlanResponse>;
  abstract getExamHistory(): Observable<ExamHistoryResponse>;
  abstract getRecommendations(): Observable<RecommendationsResponse>;
}
