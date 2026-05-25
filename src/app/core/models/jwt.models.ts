export interface JwtHeader {
  alg?: string;
  typ?: string;
  kid?: string;
  [key: string]: unknown;
}

export interface JwtPayload {
  sub?: string;
  iss?: string;
  aud?: string | string[];
  exp?: number;
  iat?: number;
  nbf?: number;
  [key: string]: unknown;
}

export interface DecodedJwt {
  token: string;
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
  algorithm: string | null;
  expiresAt: string | null;
  isExpired: boolean;
  decodedAt: string;
}

export interface HistoryEntry {
  id: string;
  token: string;
  label: string;
  algorithm: string | null;
  expiresAt: string | null;
  createdAt: string;
  lastOpenedAt: string;
}

export type JwtDecodeStatus = 'empty' | 'decoding' | 'decoded' | 'invalid' | 'expired';

export interface JwtDecodeResult {
  decoded: DecodedJwt | null;
  errorMessage: string | null;
  status: JwtDecodeStatus;
}
