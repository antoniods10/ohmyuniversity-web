import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { USER_TYPE_OPTIONS, UNIVERSITIES } from '@constants';
import { LoginStep, UserType, University } from '@types';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  readonly step = signal<LoginStep>(1);
  private readonly router = inject(Router);
  readonly selectedType = signal<UserType>(null);
  readonly universitySearch = signal('');
  readonly selectedUniversity = signal<University | null>(null);

  readonly userTypeOptions = USER_TYPE_OPTIONS;
  readonly universities = UNIVERSITIES;

  readonly filteredUniversities = computed(() => {
    const q = this.universitySearch().toLowerCase().trim();
    if (!q) return this.universities;
    return this.universities.filter(
      u => u.name.toLowerCase().includes(q) || u.shortName.toLowerCase().includes(q),
    );
  });

  readonly isAcademicFlow = computed(
    () => this.selectedType() === 'academic' || this.selectedType() === 'staff',
  );

  selectType(type: UserType): void {
    this.selectedType.set(type);
  }

  goToStep2(): void {
    if (!this.selectedType()) return;
    this.step.set(2);
  }

  goBack(): void {
    this.step.set(1);
    this.selectedUniversity.set(null);
    this.universitySearch.set('');
  }

  selectUniversity(university: University): void {
    this.selectedUniversity.set(university);
  }

  onSearchInput(value: string): void {
    this.universitySearch.set(value);
    this.selectedUniversity.set(null);
  }

  proceedWithSSO(): void {
    const uni = this.selectedUniversity();
    if (!uni) return;

    this.router.navigate(['/dashboard']);
  }
}
