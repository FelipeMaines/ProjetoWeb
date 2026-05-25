export function toIsoDate(epochSeconds?: number): string | null {
  if (typeof epochSeconds !== 'number' || Number.isNaN(epochSeconds)) {
    return null;
  }

  return new Date(epochSeconds * 1000).toISOString();
}

export function formatRelativeExpiry(expiresAtIso: string | null): string | null {
  if (!expiresAtIso) {
    return null;
  }

  const expiresAt = new Date(expiresAtIso);
  const diffMs = expiresAt.getTime() - Date.now();
  const absSeconds = Math.round(Math.abs(diffMs) / 1000);

  if (absSeconds < 60) {
    return diffMs >= 0 ? `in ${absSeconds}s` : `${absSeconds}s ago`;
  }

  const absMinutes = Math.round(absSeconds / 60);
  if (absMinutes < 60) {
    return diffMs >= 0 ? `in ${absMinutes}m` : `${absMinutes}m ago`;
  }

  const absHours = Math.round(absMinutes / 60);
  if (absHours < 24) {
    return diffMs >= 0 ? `in ${absHours}h` : `${absHours}h ago`;
  }

  const absDays = Math.round(absHours / 24);
  return diffMs >= 0 ? `in ${absDays}d` : `${absDays}d ago`;
}
