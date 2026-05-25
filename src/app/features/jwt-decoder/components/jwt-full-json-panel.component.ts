import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmptyStateComponent } from '@app/shared/components/empty-state.component';

@Component({
  selector: 'app-jwt-full-json-panel',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  template: `
    <section class="card json-card">
      <div class="card-head">
        <div>
          <p class="eyebrow">JSON</p>
          <h3>{{ title }}</h3>
        </div>
      </div>

      <app-empty-state
        *ngIf="!data"
        title="No decoded JSON yet"
        description="Decode a valid JWT to inspect the full payload object here."
      ></app-empty-state>

      <pre *ngIf="data" class="json-block">{{ formattedJson }}</pre>
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

      .json-block {
        margin: 0;
        overflow: auto;
        border-radius: 16px;
        background: rgba(8, 12, 25, 0.85);
        border: 1px solid rgba(38, 50, 79, 0.75);
        color: #d9f3ff;
        font: 0.9rem/1.6 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
        padding: 16px;
        white-space: pre-wrap;
        word-break: break-word;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JwtFullJsonPanelComponent {
  @Input() data: unknown | null = null;
  @Input() title = 'Decoded JSON';

  get formattedJson(): string {
    return this.data ? JSON.stringify(this.data, null, 2) : '';
  }
}