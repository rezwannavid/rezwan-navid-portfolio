import { createHmac, timingSafeEqual } from "node:crypto";

export const accessCookieName = (slug: string) => `rn_work_access_${slug.replace(/[^a-z0-9-]/g, "")}`;

function accessSecret() {
  return process.env.WORK_ACCESS_SECRET;
}

export function passwordEnvironmentKey(identifier: string) {
  return `WORK_PASSWORD_${identifier.replace(/[^A-Z0-9_]/g, "")}`;
}

export function verifyProjectPassword(identifier: string, supplied: string) {
  const expected = process.env[passwordEnvironmentKey(identifier)];
  if (!expected || !accessSecret()) return { valid: false, configured: false };
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  if (expectedBuffer.length !== suppliedBuffer.length) return { valid: false, configured: true };
  return { valid: timingSafeEqual(expectedBuffer, suppliedBuffer), configured: true };
}

export function createAccessToken(slug: string) {
  const secret = accessSecret();
  if (!secret) throw new Error("WORK_ACCESS_SECRET is not configured");
  return createHmac("sha256", secret).update(`work:${slug}`).digest("base64url");
}

export function hasValidAccessToken(slug: string, token?: string) {
  const secret = accessSecret();
  if (!secret || !token) return false;
  const expected = createHmac("sha256", secret).update(`work:${slug}`).digest();
  let supplied: Buffer;
  try {
    supplied = Buffer.from(token, "base64url");
  } catch {
    return false;
  }
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}
