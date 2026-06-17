import { Component } from '@angular/core';
import { LucideScale } from '@lucide/angular';
import { CustomCardComponent } from '@ui/custom-card/custom-card.component';
import { CardStatusComponent } from '@ui/custom-card/card-variants.component';
import { CustomLinkComponent } from '@ui/custom-link/custom-link.component';
import { CustomEmailComponent } from '@ui/custom-email/custom-email.component';
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_UPDATE,
  PRIVACY_INTRO,
  PRIVACY_ACADEMIC_USERS,
  PRIVACY_ORG_USERS_INTRO,
  PRIVACY_ORG_USERS_LIST,
  PRIVACY_ANONYMOUS_USERS,
  PRIVACY_PURPOSES_TABLE,
  PRIVACY_PURPOSES_NOTE,
  PRIVACY_RETENTION_INTRO,
  PRIVACY_RETENTION_LIST,
  PRIVACY_RIGHTS_INTRO,
  PRIVACY_RIGHTS_LIST,
  PRIVACY_RIGHTS_FOOTNOTE,
  PRIVACY_SECURITY_TEXT,
  PRIVACY_CHANGES_TEXT,
  PRIVACY_RELATED_DOCS,
} from '@constants';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [CustomCardComponent, CardStatusComponent, CustomLinkComponent, CustomEmailComponent],
  templateUrl: './privacy-policy.page.html',
})
export class PrivacyPolicyPage {
  readonly iconScale = LucideScale;

  readonly lastUpdated = LEGAL_UPDATE.privacyPolicy;
  readonly contactEmail = LEGAL_CONTACT_EMAIL;

  readonly intro = PRIVACY_INTRO;
  readonly academicUsers = PRIVACY_ACADEMIC_USERS;
  readonly orgUsersIntro = PRIVACY_ORG_USERS_INTRO;
  readonly orgUsersList = PRIVACY_ORG_USERS_LIST;
  readonly anonymousUsers = PRIVACY_ANONYMOUS_USERS;
  readonly purposesTable = PRIVACY_PURPOSES_TABLE;
  readonly purposesNote = PRIVACY_PURPOSES_NOTE;
  readonly retentionIntro = PRIVACY_RETENTION_INTRO;
  readonly retentionList = PRIVACY_RETENTION_LIST;
  readonly rightsIntro = PRIVACY_RIGHTS_INTRO;
  readonly rightsList = PRIVACY_RIGHTS_LIST;
  readonly rightsFootnote = PRIVACY_RIGHTS_FOOTNOTE;
  readonly securityText = PRIVACY_SECURITY_TEXT;
  readonly changesText = PRIVACY_CHANGES_TEXT;
  readonly relatedDocs = PRIVACY_RELATED_DOCS;
}
