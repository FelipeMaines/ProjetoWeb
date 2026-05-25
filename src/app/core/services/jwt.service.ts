import { Injectable } from '@angular/core';
import { DecodedJwt, JwtDecodeResult, JwtHeader, JwtPayload } from '@app/core/models/jwt.models';
import { decodeBase64Url, isBase64UrlCandidate } from '@app/core/utils/base64url.util';
import { toIsoDate } from '@app/core/utils/date.util';

export class JwtDecodeError extends Error {
  constructor(
    public readonly code: 'empty_token' | 'malformed_token' | 'invalid_part' | 'invalid_json',
    message: string
  ) {
    super(message);
    this.name = 'JwtDecodeError';
  }
}

@Injectable({ providedIn: 'root' })
export class JwtService {
  decode(token: string): DecodedJwt {
    const normalizedToken = token.trim();

    if (!normalizedToken) {
      throw new JwtDecodeError('empty_token', 'Paste a JWT to decode it.');
    }

    const parts = normalizedToken.split('.');

    if (parts.length !== 3) {
      throw new JwtDecodeError('malformed_token', 'JWTs must contain exactly three dot-separated parts.');
    }

    const [headerPart = '', payloadPart = '', signaturePart = ''] = parts;
    const header = this.decodePart<JwtHeader>(headerPart, 'header');
    const payload = this.decodePart<JwtPayload>(payloadPart, 'payload');
    const algorithm = typeof header.alg === 'string' ? header.alg : null;
    const expiresAt = toIsoDate(typeof payload.exp === 'number' ? payload.exp : undefined);
    const isExpired = this.isExpired(payload.exp);

    return {
      token: normalizedToken,
      header,
      payload,
      signature: signaturePart,
      algorithm,
      expiresAt,
      isExpired,
      decodedAt: new Date().toISOString(),
    };
  }

  summarize(decoded: DecodedJwt): Array<{ label: string; value: string | null }> {
    return [
      { label: 'Algorithm', value: decoded.algorithm ?? 'Unknown' },
      { label: 'Subject', value: this.readString(decoded.payload.sub) },
      { label: 'Issuer', value: this.readIssuer(decoded.payload) },
      { label: 'Audience', value: this.readAudience(decoded.payload) },
      { label: 'Issued at', value: this.readIssuedAt(decoded.payload) },
      { label: 'Expires at', value: this.readExpiresAt(decoded.payload, decoded.expiresAt) },
      { label: 'Expires in', value: this.readExpiresIn(decoded.payload) },
      { label: 'Status', value: decoded.isExpired ? 'Expired' : 'Valid' },
    ];
  }

  createHistoryLabel(decoded: DecodedJwt): string {
    return decoded.payload.sub
      ? String(decoded.payload.sub)
      : decoded.algorithm
        ? `JWT (${decoded.algorithm})`
        : 'JWT token';
  }

  private decodePart<T extends Record<string, unknown>>(part: string, label: 'header' | 'payload'): T {
    if (!isBase64UrlCandidate(part)) {
      throw new JwtDecodeError('invalid_part', `The ${label} part is not valid Base64URL.`);
    }

    try {
      return JSON.parse(decodeBase64Url(part)) as T;
    } catch {
      throw new JwtDecodeError('invalid_json', `The ${label} part does not contain valid JSON.`);
    }
  }

  private readString(value: unknown): string | null {
    return typeof value === 'string' && value.trim() ? value : null;
  }

  private readAudience(audience: unknown): string | null {
    if (typeof audience === 'string' && audience.trim()) {
      return audience;
    }

    if (Array.isArray(audience) && audience.length > 0) {
      return audience.filter((item) => typeof item === 'string').join(', ');
    }

    return null;
  }

  private readIssuer(payload: JwtPayload): string | null {
    return this.readString(payload.iss) ?? this.readString(payload['issuer']);
  }

  private readIssuedAt(payload: JwtPayload): string | null {
    if (typeof payload.iat === 'number') {
      return this.readDate(payload.iat);
    }

    return this.readString(payload['issuedAt']);
  }

  private readExpiresAt(payload: JwtPayload, computedExpiresAt: string | null): string | null {
    return computedExpiresAt ?? this.readString(payload['expiresAt']);
  }

  private readExpiresIn(payload: JwtPayload): string | null {
    if (typeof payload['expiresIn'] === 'number') {
      return `${payload['expiresIn']}`;
    }

    return this.readString(payload['expiresIn']);
  }

  private readDate(epochSeconds?: number): string | null {
    if (typeof epochSeconds !== 'number' || Number.isNaN(epochSeconds)) {
      return null;
    }

    return new Date(epochSeconds * 1000).toISOString();
  }

  private isExpired(exp?: number): boolean {
    return typeof exp === 'number' && !Number.isNaN(exp) ? Date.now() >= exp * 1000 : false;
  }
}
