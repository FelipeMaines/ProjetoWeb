import { computed, inject, Injectable, signal } from '@angular/core';
import { HistoryEntry, JwtDecodeStatus, DecodedJwt } from '@app/core/models/jwt.models';
import { HistoryService } from '@app/core/services/history.service';
import { JwtDecodeError, JwtService } from '@app/core/services/jwt.service';

@Injectable({ providedIn: 'root' })
export class JwtDecoderFacade {
  private readonly jwtService = inject(JwtService);
  private readonly historyService = inject(HistoryService);

  private readonly currentToken = signal('');
  private readonly currentDecoded = signal<DecodedJwt | null>(null);
  private readonly currentStatus = signal<JwtDecodeStatus>('empty');
  private readonly currentError = signal<string | null>(null);
  private readonly currentHistory = signal<HistoryEntry[]>(this.historyService.loadHistory());
  private readonly currentSelectedHistoryId = signal<string | null>(null);

  readonly token = this.currentToken.asReadonly();
  readonly decoded = this.currentDecoded.asReadonly();
  readonly status = this.currentStatus.asReadonly();
  readonly errorMessage = this.currentError.asReadonly();
  readonly history = this.currentHistory.asReadonly();
  readonly selectedHistoryId = this.currentSelectedHistoryId.asReadonly();
  readonly summaryItems = computed(() => {
    const decoded = this.currentDecoded();
    return decoded ? this.jwtService.summarize(decoded) : [];
  });

  constructor() {}

  onTokenChange(token: string): void {
    this.currentToken.set(token);
    this.currentStatus.set(token.trim() ? 'decoding' : 'empty');
    this.currentError.set(null);
    this.currentDecoded.set(null);
  }

  decodeCurrentToken(persistHistory = true): void {
    try {
      const decoded = this.jwtService.decode(this.currentToken());
      this.currentDecoded.set(decoded);
      this.currentError.set(null);
      this.currentStatus.set(decoded.isExpired ? 'expired' : 'decoded');

      if (persistHistory) {
        this.currentHistory.set(this.historyService.addEntry(decoded));
        this.currentSelectedHistoryId.set(null);
      }
    } catch (error) {
      this.currentDecoded.set(null);
      this.currentStatus.set('invalid');
      this.currentError.set(this.readErrorMessage(error));
    }
  }

  selectHistoryItem(historyId: string): void {
    const selected = this.historyService.selectEntry(historyId);

    if (!selected) {
      return;
    }

    this.currentSelectedHistoryId.set(selected.id);
    this.currentToken.set(selected.token);
    this.currentStatus.set('decoding');
    this.currentError.set(null);
    this.decodeCurrentToken(false);
    this.currentHistory.set(this.historyService.loadHistory());
  }

  removeHistoryItem(historyId: string): void {
    this.currentHistory.set(this.historyService.removeEntry(historyId));
    if (this.currentSelectedHistoryId() === historyId) {
      this.currentSelectedHistoryId.set(null);
    }
  }

  clearHistory(): void {
    this.currentHistory.set(this.historyService.clearHistory());
    this.currentSelectedHistoryId.set(null);
  }

  clearInput(): void {
    this.currentToken.set('');
    this.currentDecoded.set(null);
    this.currentError.set(null);
    this.currentStatus.set('empty');
    this.currentSelectedHistoryId.set(null);
  }

  copyDecodedJson(): string {
    const decoded = this.currentDecoded();
    return decoded ? JSON.stringify({ header: decoded.header, payload: decoded.payload }, null, 2) : '';
  }

  private readErrorMessage(error: unknown): string {
    if (error instanceof JwtDecodeError) {
      return error.message;
    }

    if (error instanceof Error && error.message) {
      return error.message;
    }

    return 'Unable to decode the token.';
  }
}
