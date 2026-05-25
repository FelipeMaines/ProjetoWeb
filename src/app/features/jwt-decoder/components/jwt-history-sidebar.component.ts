import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EmptyStateComponent } from '@app/shared/components/empty-state.component';
import { HistoryEntry } from '@app/core/models/jwt.models';

@Component({
  selector: 'app-jwt-history-sidebar',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  template: `
    <aside class="card history-card">
      <div class="card-head">
        <div>
          <p class="eyebrow">History</p>
          <h3>Recent tokens</h3>
        </div>
        <button *ngIf="items.length" type="button" class="ghost-button danger" (click)="clear.emit()">Clear</button>
      </div>

      <app-empty-state *ngIf="!items.length" title="History is empty" description="Decoded JWTs will appear here for quick reuse." ></app-empty-state>

      <ul *ngIf="items.length" class="history-list">
        <li *ngFor="let item of items" class="history-item" [class.selected]="item.id === selectedId">
          <button type="button" class="history-select" (click)="select.emit(item.id)">
            <div class="history-main">
              <strong>{{ item.label }}</strong>
              <span>{{ item.algorithm || 'Unknown alg' }}</span>
            </div>
            <small>{{ item.createdAt | date: 'short' }}</small>
          </button>
          <button type="button" class="remove-button" (click)="remove.emit(item.id)">Remove</button>
        </li>
      </ul>
    </aside>
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

      .ghost-button,
      .remove-button {
        border-radius: 999px;
        border: 1px solid rgba(154, 168, 199, 0.25);
        background: transparent;
        color: #e8eefc;
        cursor: pointer;
        font: inherit;
        padding: 8px 12px;
      }

      .ghost-button.danger,
      .remove-button {
        border-color: rgba(255, 107, 107, 0.28);
        color: #ffb2b2;
      }

      .history-list {
        display: grid;
        gap: 10px;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .history-item {
        display: grid;
        gap: 8px;
        padding: 12px;
        border-radius: 16px;
        border: 1px solid rgba(38, 50, 79, 0.75);
        background: rgba(8, 12, 25, 0.75);
      }

      .history-item.selected {
        border-color: rgba(93, 214, 192, 0.55);
        box-shadow: 0 0 0 1px rgba(93, 214, 192, 0.12) inset;
      }

      .history-select {
        align-items: flex-start;
        background: transparent;
        border: 0;
        color: inherit;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 0;
        text-align: left;
        width: 100%;
      }

      .history-main {
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex-wrap: wrap;
      }

      .history-main strong {
        font-size: 0.95rem;
      }

      .history-main span,
      small {
        color: #9aa8c7;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JwtHistorySidebarComponent {
  @Input() items: HistoryEntry[] = [];
  @Input() selectedId: string | null = null;
  @Input() maxItems = 20;
  @Input() collapsed = false;
  @Input() showTimestamps = true;

  @Output() select = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  @Output() toggleCollapse = new EventEmitter<void>();
}
