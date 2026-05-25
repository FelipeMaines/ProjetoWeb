import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmptyStateComponent } from '@app/shared/components/empty-state.component';

@Component({
  selector: 'app-jwt-summary-panel',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  template: `
    <section class="card summary-card">
      <div class="card-head">
        <div>
          <p class="eyebrow">Summary</p>
          <h3>Token metadata</h3>
        </div>
        <span class="status-chip" [class.valid]="status === 'valid'" [class.expired]="status === 'expired'" [class.invalid]="status === 'invalid'">
          {{ status | titlecase }}
        </span>
      </div>

      <app-empty-state *ngIf="status === 'empty'" title="No token decoded yet" description="Paste a JWT above to see its summary here."></app-empty-state>

      <dl *ngIf="status !== 'empty'" class="summary-grid">
        <div class="summary-item">
          <dt>Algorithm</dt>
          <dd>{{ algorithm || 'Unknown' }}</dd>
        </div>
        <div class="summary-item">
          <dt>Subject</dt>
          <dd>{{ subject || '—' }}</dd>
        </div>
        <div class="summary-item">
          <dt>Issuer</dt>
          <dd>{{ issuer || '—' }}</dd>
        </div>
        <div class="summary-item">
          <dt>Audience</dt>
          <dd>{{ audience || '—' }}</dd>
        </div>
        <div class="summary-item">
          <dt>Issued at</dt>
          <dd>{{ issuedAt || '—' }}</dd>
        </div>
        <div class="summary-item">
          <dt>Expires at</dt>
          <dd>{{ expiresAt || '—' }}</dd>
        </div>
        <div class="summary-item">
          <dt>Expires in</dt>
          <dd>{{ expiresIn || '—' }}</dd>
        </div>
      </dl>
    </section>
  `,
  styles: [
    `
      .card {
        display: grid;
        gap: 14px;
        padding: 18px 20px;
        border-radius: 20px;
        border: 1px solid rgba(38, 50, 79, 0.9);
        background: rgba(17, 24, 45, 0.92);
      }

      .card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .eyebrow {
        margin: 0 0 4px;
        color: #5dd6c0;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      h3 {
        margin: 0;
        font-size: 1.05rem;
      }

      .status-chip {
        align-items: center;
        border-radius: 999px;
        background: rgba(154, 168, 199, 0.12);
        color: #e8eefc;
        display: inline-flex;
        font-size: 0.78rem;
        font-weight: 800;
        padding: 8px 12px;
        text-transform: uppercase;
      }

      .status-chip.valid {
        background: rgba(74, 222, 128, 0.14);
        color: #8ff0ab;
      }

      .status-chip.expired {
        background: rgba(245, 184, 75, 0.16);
        color: #ffd98a;
      }

      .status-chip.invalid {
        background: rgba(255, 107, 107, 0.16);
        color: #ffb2b2;
      }

      .summary-grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .summary-item {
        border-radius: 14px;
        background: rgba(8, 12, 25, 0.7);
        border: 1px solid rgba(38, 50, 79, 0.75);
        padding: 12px 14px;
      }

      dt {
        color: #9aa8c7;
        font-size: 0.8rem;
        font-weight: 700;
        margin-bottom: 4px;
      }

      dd {
        color: #e8eefc;
        font-size: 0.92rem;
        margin: 0;
        overflow-wrap: anywhere;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JwtSummaryPanelComponent {
  @Input() algorithm: string | null = null;
  @Input() subject: string | null = null;
  @Input() issuer: string | null = null;
  @Input() audience: string | string[] | null = null;
  @Input() issuedAt: string | null = null;
  @Input() expiresAt: string | null = null;
  @Input() expiresIn: string | null = null;
  @Input() status: 'empty' | 'valid' | 'expired' | 'invalid' = 'empty';
}
