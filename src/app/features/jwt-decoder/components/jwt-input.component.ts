import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-jwt-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="card input-card">
      <div class="card-head">
        <div>
          <p class="eyebrow">Input</p>
          <h2>Paste JWT</h2>
        </div>
        <div class="actions">
          <button type="button" class="ghost-button" [disabled]="disabled" (click)="clear.emit()">Clear</button>
          <button type="button" class="primary-button" [disabled]="disabled" (click)="submit.emit(value)">Decode JWT</button>
        </div>
      </div>

      <label class="field-label" for="jwt-input">JWT token</label>
      <textarea
        id="jwt-input"
        class="jwt-input"
        [value]="value"
        [attr.placeholder]="placeholder"
        [disabled]="disabled"
        [attr.maxlength]="maxLength ?? null"
        (input)="onInput($event)"
        (paste)="onPaste($event)"
        (blur)="submit.emit(value)"
      ></textarea>

      <div class="meta-row">
        <span class="helper-text">{{ helperText || 'Paste a three-part JWT to inspect its header and payload.' }}</span>
        <span *ngIf="errorMessage" class="error-text">{{ errorMessage }}</span>
      </div>
    </section>
  `,
  styles: [
    `
      .card {
        display: grid;
        gap: 14px;
        padding: 20px;
        border-radius: 20px;
        border: 1px solid rgba(38, 50, 79, 0.9);
        background: linear-gradient(180deg, rgba(17, 24, 45, 0.96), rgba(14, 19, 36, 0.96));
        box-shadow: 0 12px 40px rgba(3, 6, 15, 0.35);
      }

      .card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
      }

      .eyebrow {
        margin: 0 0 4px;
        color: #5dd6c0;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      h2 {
        margin: 0;
        font-size: 1.3rem;
        line-height: 1.2;
      }

      .actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .ghost-button,
      .primary-button {
        border-radius: 999px;
        border: 1px solid transparent;
        cursor: pointer;
        font: inherit;
        padding: 10px 14px;
        transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
      }

      .ghost-button {
        background: transparent;
        border-color: rgba(154, 168, 199, 0.25);
        color: #e8eefc;
      }

      .primary-button {
        background: #5dd6c0;
        color: #07131b;
        font-weight: 800;
      }

      .ghost-button:hover,
      .primary-button:hover {
        transform: translateY(-1px);
      }

      .field-label {
        color: #9aa8c7;
        font-size: 0.9rem;
        font-weight: 700;
      }

      .jwt-input {
        min-height: 120px;
        border-radius: 16px;
        border: 1px solid rgba(38, 50, 79, 0.95);
        background: rgba(8, 12, 25, 0.9);
        color: #e8eefc;
        font: 0.95rem/1.5 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
        padding: 14px 16px;
        resize: vertical;
        width: 100%;
      }

      .jwt-input:focus {
        border-color: rgba(93, 214, 192, 0.75);
        box-shadow: 0 0 0 3px rgba(93, 214, 192, 0.14);
        outline: none;
      }

      .meta-row {
        display: flex;
        gap: 12px;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .helper-text {
        color: #9aa8c7;
        font-size: 0.88rem;
      }

      .error-text {
        color: #ff9b9b;
        font-size: 0.88rem;
        font-weight: 700;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JwtInputComponent {
  @Input() value = '';
  @Input() placeholder = 'eyJhbGciOi...';
  @Input() disabled = false;
  @Input() autoDecode = false;
  @Input() errorMessage: string | null = null;
  @Input() helperText: string | null = null;
  @Input() maxLength?: number;

  @Output() valueChange = new EventEmitter<string>();
  @Output() submit = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  @Output() paste = new EventEmitter<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.valueChange.emit(target.value);
  }

  onPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text/plain') ?? '';
    this.paste.emit(pastedText);
    if (this.autoDecode) {
      this.submit.emit(pastedText);
    }
  }
}
