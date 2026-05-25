import { Injectable } from '@angular/core';
import { HistoryEntry, DecodedJwt } from '@app/core/models/jwt.models';
import { STORAGE_KEYS } from '@app/core/tokens/storage-keys';
import { StorageService } from '@app/core/services/storage.service';
import { JwtService } from '@app/core/services/jwt.service';

const MAX_HISTORY_ITEMS = 20;

@Injectable({ providedIn: 'root' })
export class HistoryService {
  constructor(
    private readonly storageService: StorageService,
    private readonly jwtService: JwtService
  ) {}

  loadHistory(): HistoryEntry[] {
    const history = this.storageService.get<HistoryEntry[]>(STORAGE_KEYS.history, []);
    return this.normalize(history);
  }

  addEntry(decoded: DecodedJwt): HistoryEntry[] {
    const existingHistory = this.loadHistory().filter((entry) => entry.token !== decoded.token);
    const createdAt = decoded.decodedAt;

    const nextEntry: HistoryEntry = {
      id: this.createId(decoded.token),
      token: decoded.token,
      label: this.jwtService.createHistoryLabel(decoded),
      algorithm: decoded.algorithm,
      expiresAt: decoded.expiresAt,
      createdAt,
      lastOpenedAt: createdAt,
    };

    const nextHistory = [nextEntry, ...existingHistory].slice(0, MAX_HISTORY_ITEMS);
    this.storageService.set(STORAGE_KEYS.history, nextHistory);
    return nextHistory;
  }

  selectEntry(id: string): HistoryEntry | null {
    const history = this.loadHistory();
    const selected = history.find((entry) => entry.id === id) ?? null;

    if (!selected) {
      return null;
    }

    const refreshed: HistoryEntry = {
      ...selected,
      lastOpenedAt: new Date().toISOString(),
    };

    const nextHistory = [
      refreshed,
      ...history.filter((entry) => entry.id !== id),
    ].slice(0, MAX_HISTORY_ITEMS);

    this.storageService.set(STORAGE_KEYS.history, nextHistory);
    return refreshed;
  }

  removeEntry(id: string): HistoryEntry[] {
    const nextHistory = this.loadHistory().filter((entry) => entry.id !== id);
    this.storageService.set(STORAGE_KEYS.history, nextHistory);
    return nextHistory;
  }

  clearHistory(): HistoryEntry[] {
    this.storageService.remove(STORAGE_KEYS.history);
    return [];
  }

  private normalize(history: HistoryEntry[]): HistoryEntry[] {
    return Array.isArray(history)
      ? history.filter((entry) => typeof entry?.id === 'string' && typeof entry?.token === 'string')
      : [];
  }

  private createId(token: string): string {
    const entropy = `${token}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return globalThis.crypto?.randomUUID?.() ?? entropy;
  }
}
