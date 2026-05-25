import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="error-banner" [class.warning]="severity === 'warning'" [class.error]="severity === 'error'">
      <div class="message">{{ message }}</div>
      <button *ngIf="dismissible" type="button" class="dismiss-button" (click)="dismiss.emit()">Dismiss</button>
    </section>
  `,
  styles: [
    `
      .error-banner {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 16px;
        border-radius: 14px;
        border: 1px solid rgba(255, 107, 107, 0.35);
        background: rgba(255, 107, 107, 0.08);
        color: #ffe9e9;
      }

      .error-banner.warning {
        border-color: rgba(245, 184, 75, 0.35);
        background: rgba(245, 184, 75, 0.1);
        color: #fff3d0;
      }

      .message {
        font-size: 0.95rem;
        line-height: 1.4;
      }

      .dismiss-button {
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font: inherit;
        padding: 0;
        opacity: 0.85;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorBannerComponent {
  @Input() message = '';
  @Input() severity: 'warning' | 'error' = 'error';
  @Input() dismissible = false;
  @Output() dismiss = new EventEmitter<void>();
}
