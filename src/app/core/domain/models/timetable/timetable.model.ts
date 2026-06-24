export interface TimetableResponse {
  id: string;
  universityId: string;
  departmentId: string;
  departmentName: string;
  degreeType: string;
  timetablePageUrl: string;
  pdfUrl: string;
  label: string | null;
  active: boolean;
  fetchedAt: string;
}
