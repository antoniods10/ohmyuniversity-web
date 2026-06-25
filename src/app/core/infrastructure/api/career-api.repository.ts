import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '@constants';
import { CareerRepository } from '../../domain/repositories/career.repository';
import { TranscriptResponse } from 'src/app/core/domain/models/career/transcript.model';
import { GradesResponse } from 'src/app/core/domain/models/career/grades.model';
import { StudyPlanResponse } from 'src/app/core/domain/models/career/study-plan.model';
import { ExamHistoryResponse } from 'src/app/core/domain/models/career/exam-history.model';
import { RecommendationsResponse } from 'src/app/core/domain/models/career/recommendations.model';

@Injectable()
export class CareerApiRepository extends CareerRepository {
  private readonly http = inject(HttpClient);

  getTranscript(): Observable<TranscriptResponse> {
    return this.http.get<TranscriptResponse>(API.career.transcript);
  }

  getGrades(): Observable<GradesResponse> {
    return this.http.get<GradesResponse>(API.career.grades);
  }

  getStudyPlan(): Observable<StudyPlanResponse> {
    return this.http.get<StudyPlanResponse>(API.career.studyPlan);
  }

  getExamHistory(): Observable<ExamHistoryResponse> {
    return this.http.get<ExamHistoryResponse>(API.career.examHistory);
  }

  getRecommendations(): Observable<RecommendationsResponse> {
    return this.http.get<RecommendationsResponse>(API.career.recommendations);
  }
}
