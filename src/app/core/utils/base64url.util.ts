export function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  const binary = globalThis.atob(padded);

  try {
    return decodeURIComponent(
      Array.from(binary)
        .map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
  } catch {
    return binary;
  }
}

export function isBase64UrlCandidate(value: string): boolean {
  return /^[A-Za-z0-9_-]+$/.test(value);
}
