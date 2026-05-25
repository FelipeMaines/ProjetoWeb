import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorBannerComponent } from '@app/shared/components/error-banner.component';
import { JwtInputComponent } from '@app/features/jwt-decoder/components/jwt-input.component';
import { JwtSummaryPanelComponent } from '@app/features/jwt-decoder/components/jwt-summary-panel.component';
import { JwtFullJsonPanelComponent } from '@app/features/jwt-decoder/components/jwt-full-json-panel.component';
import { JwtHeaderPanelComponent } from '@app/features/jwt-decoder/components/jwt-header-panel.component';
import { JwtPayloadPanelComponent } from '@app/features/jwt-decoder/components/jwt-payload-panel.component';
import { JwtHistorySidebarComponent } from '@app/features/jwt-decoder/components/jwt-history-sidebar.component';
import { JwtDecoderFacade } from '@app/features/jwt-decoder/jwt-decoder.facade';
import { JwtService } from '@app/core/services/jwt.service';

@Component({
  selector: 'app-jwt-decoder-page',
  standalone: true,
  imports: [
    CommonModule,
    ErrorBannerComponent,
    JwtInputComponent,
    JwtSummaryPanelComponent,
    JwtFullJsonPanelComponent,
    JwtHeaderPanelComponent,
    JwtPayloadPanelComponent,
    JwtHistorySidebarComponent,
  ],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Developer productivity tool</p>
        <h1>JWT Decoder</h1>
        <p class="subtitle">Paste a token, inspect its claims, and keep a compact local history.</p>
      </div>
      <div class="status-note">Offline-first · localStorage only</div>
    </section>

    <div class="page-grid">
      <main class="main-column">
        <app-jwt-input
          [value]="facade.token()"
          [errorMessage]="facade.errorMessage()"
          [autoDecode]="true"
          helperText="Paste a JWT, then decode it locally in the browser."
          (valueChange)="facade.onTokenChange($event)"
          (submit)="facade.decodeCurrentToken()"
          (clear)="facade.clearInput()"
          (paste)="onPaste($event)"
        ></app-jwt-input>

        <app-error-banner *ngIf="facade.errorMessage()" [message]="facade.errorMessage() || ''" severity="error"></app-error-banner>

        <app-jwt-summary-panel
          [algorithm]="summary.algorithm"
          [subject]="summary.subject"
          [issuer]="summary.issuer"
          [audience]="summary.audience"
          [issuedAt]="summary.issuedAt"
          [expiresAt]="summary.expiresAt"
          [expiresIn]="summary.expiresIn"
          [status]="facade.status()"
        ></app-jwt-summary-panel>

        <app-jwt-full-json-panel [data]="facade.decoded()"></app-jwt-full-json-panel>

        <div class="panel-stack">
          <app-jwt-header-panel
            [data]="facade.decoded()?.header || null"
            [collapsed]="false"
            title="Header"
            (copy)="copyToClipboard($event)"
          ></app-jwt-header-panel>

          <app-jwt-payload-panel
            [data]="facade.decoded()?.payload || null"
            [collapsed]="false"
            title="Payload"
            (copy)="copyToClipboard($event)"
          ></app-jwt-payload-panel>
        </div>
      </main>

      <aside class="sidebar-column">
        <app-jwt-history-sidebar
          [items]="facade.history()"
          [selectedId]="facade.selectedHistoryId()"
          (select)="facade.selectHistoryItem($event)"
          (remove)="facade.removeHistoryItem($event)"
          (clear)="facade.clearHistory()"
        ></app-jwt-history-sidebar>
      </aside>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .page-header {
        align-items: end;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 24px;
      }

      .eyebrow {
        color: #5dd6c0;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        margin: 0 0 8px;
        text-transform: uppercase;
      }

      h1 {
        color: #e8eefc;
        font-size: clamp(1.9rem, 4vw, 3rem);
        margin: 0;
      }

      .subtitle {
        color: #9aa8c7;
        font-size: 1rem;
        line-height: 1.6;
        margin: 8px 0 0;
        max-width: 62ch;
      }

      .status-note {
        align-self: center;
        border: 1px solid rgba(93, 214, 192, 0.22);
        border-radius: 999px;
        color: #a5f1e1;
        font-size: 0.82rem;
        font-weight: 800;
        padding: 10px 14px;
        white-space: nowrap;
      }

      .page-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: minmax(0, 1fr) 340px;
        align-items: start;
      }

      .main-column,
      .sidebar-column {
        display: grid;
        gap: 16px;
      }

      .panel-stack {
        display: grid;
        gap: 16px;
      }

      @media (max-width: 1024px) {
        .page-grid {
          grid-template-columns: 1fr;
        }

        .status-note {
          align-self: flex-start;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JwtDecoderPageComponent {
  constructor(
    public readonly facade: JwtDecoderFacade,
    private readonly jwtService: JwtService
  ) {}

  get summary() {
    const decoded = this.facade.decoded();

    if (!decoded) {
      return {
        algorithm: null,
        subject: null,
        issuer: null,
        audience: null,
        issuedAt: null,
        expiresAt: null,
        expiresIn: null,
      };
    }

    const summaryItems = this.jwtService.summarize(decoded);
    const summaryMap = new Map(summaryItems.map((item) => [item.label, item.value]));

    return {
      algorithm: summaryMap.get('Algorithm') ?? null,
      subject: summaryMap.get('Subject') ?? null,
      issuer: summaryMap.get('Issuer') ?? null,
      audience: summaryMap.get('Audience') ?? null,
      issuedAt: summaryMap.get('Issued at') ?? null,
      expiresAt: summaryMap.get('Expires at') ?? null,
      expiresIn: summaryMap.get('Expires in') ?? null,
    };
  }

  onPaste(value: string): void {
    this.facade.onTokenChange(value);
  }

  copyToClipboard(value: string): void {
    if (!value) {
      return;
    }

    if (globalThis.navigator?.clipboard) {
      void globalThis.navigator.clipboard.writeText(value);
    }
  }

}
