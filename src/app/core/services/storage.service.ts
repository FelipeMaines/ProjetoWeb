import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly fallbackStore = new Map<string, string>();

  get<T>(key: string, fallback: T): T {
    const rawValue = this.readRaw(key);

    if (rawValue === null) {
      return fallback;
    }

    try {
      return JSON.parse(rawValue) as T;
    } catch {
      this.remove(key);
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    const serialized = JSON.stringify(value);

    try {
      this.storage.setItem(key, serialized);
    } catch {
      this.fallbackStore.set(key, serialized);
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch {
      this.fallbackStore.delete(key);
    }
  }

  has(key: string): boolean {
    return this.readRaw(key) !== null;
  }

  clearNamespace(prefix: string): void {
    const keys = this.keys().filter((key) => key.startsWith(prefix));

    for (const key of keys) {
      this.remove(key);
    }
  }

  private readRaw(key: string): string | null {
    try {
      const value = this.storage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch {
      // Ignore and fall back to the in-memory store.
    }

    return this.fallbackStore.get(key) ?? null;
  }

  private keys(): string[] {
    try {
      return Object.keys(this.storage);
    } catch {
      return Array.from(this.fallbackStore.keys());
    }
  }

  private get storage(): Storage {
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      return globalThis.localStorage;
    }

    throw new Error('localStorage is unavailable');
  }
}
