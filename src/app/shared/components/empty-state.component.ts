import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="empty-state">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <button *ngIf="actionLabel" type="button" class="action-button" (click)="action.emit()">{{ actionLabel }}</button>
    </section>
  `,
  styles: [
    `
      .empty-state {
        display: grid;
        gap: 8px;
        padding: 18px;
        border-radius: 14px;
        border: 1px dashed rgba(154, 168, 199, 0.35);
        background: rgba(17, 24, 45, 0.55);
        color: #c8d4ef;
      }

      .empty-state h3 {
        margin: 0;
        font-size: 1rem;
      }

      .empty-state p {
        margin: 0;
        color: #9aa8c7;
        font-size: 0.92rem;
        line-height: 1.5;
      }

      .action-button {
        width: fit-content;
        border: 0;
        border-radius: 999px;
        background: #5dd6c0;
        color: #07131b;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        padding: 10px 14px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() actionLabel?: string;
  @Output() action = new EventEmitter<void>();
}
