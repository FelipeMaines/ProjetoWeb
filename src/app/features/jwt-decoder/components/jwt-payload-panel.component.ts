import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EmptyStateComponent } from '@app/shared/components/empty-state.component';

@Component({
  selector: 'app-jwt-payload-panel',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  template: `
    <section class="card json-card payload-card">
      <div class="card-head">
        <div>
          <p class="eyebrow">JSON</p>
          <h3>{{ title }}</h3>
        </div>
        <div class="actions">
          <button *ngIf="copyEnabled" type="button" class="ghost-button" (click)="copy.emit(formattedJson)">Copy</button>
          <button type="button" class="ghost-button" (click)="toggleCollapse.emit()">{{ collapsed ? 'Expand' : 'Collapse' }}</button>
        </div>
      </div>

      <app-empty-state *ngIf="!data" title="No payload yet" description="Decode a token to view its payload." ></app-empty-state>

      <pre *ngIf="data && !collapsed" class="json-block">{{ formattedJson }}</pre>
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

      .payload-card {
        border-color: rgba(93, 214, 192, 0.22);
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

      .actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .ghost-button {
        border-radius: 999px;
        border: 1px solid rgba(154, 168, 199, 0.25);
        background: transparent;
        color: #e8eefc;
        cursor: pointer;
        font: inherit;
        padding: 8px 12px;
      }

      .json-block {
        margin: 0;
        overflow: auto;
        border-radius: 16px;
        background: rgba(8, 12, 25, 0.85);
        border: 1px solid rgba(38, 50, 79, 0.75);
        color: #eefcfb;
        font: 0.9rem/1.6 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
        padding: 16px;
        white-space: pre-wrap;
        word-break: break-word;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JwtPayloadPanelComponent {
  @Input() data: Record<string, unknown> | null = null;
  @Input() collapsed = false;
  @Input() title = 'Payload';
  @Input() copyEnabled = true;
  @Input() highlightClaims: string[] = ['sub', 'iss', 'aud', 'exp', 'iat'];

  @Output() copy = new EventEmitter<string>();
  @Output() toggleCollapse = new EventEmitter<void>();

  get formattedJson(): string {
    return this.data ? JSON.stringify(this.data, null, 2) : '';
  }
}
