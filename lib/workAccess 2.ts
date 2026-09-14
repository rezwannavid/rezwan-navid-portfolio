import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const accessCookieName = "rn_case_study_access";

function accessSecret() {
  return process.env.WORK_ACCESS_SECRET;
}

export function verifyCaseStudyPassword(supplied: string) {
  const expected = process.env.CASE_STUDY_PASSWORD;
  if (!expected || !accessSecret()) return { valid: false, configured: false };
  const expectedBuffer = createHash("sha256").update(expected).digest();
  const suppliedBuffer = createHash("sha256").update(supplied).digest();
  return { valid: timingSafeEqual(expectedBuffer, suppliedBuffer), configured: true };
}

export function createAccessToken() {
  const secret = accessSecret();
  if (!secret) throw new Error("WORK_ACCESS_SECRET is not configured");
  return createHmac("sha256", secret).update("case-study-access").digest("base64url");
}

export function hasValidAccessToken(token?: string) {
  const secret = accessSecret();
  if (!secret || !token) return false;
  const expected = createHmac("sha256", secret).update("case-study-access").digest();
  let supplied: Buffer;
  try {
    supplied = Buffer.from(token, "base64url");
  } catch {
    return false;
  }
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}
