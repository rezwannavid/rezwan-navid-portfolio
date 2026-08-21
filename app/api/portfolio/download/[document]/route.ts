import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { accessCookieName, hasValidAccessToken } from "@/lib/workAccess";

const documents = {
  portfolio: "Rezwan-Navid-Portfolio-2026.pdf",
  resume: "Rezwan-Navid-Resume.pdf",
} as const;

export async function GET(_request: Request, { params }: { params: Promise<{ document: string }> }) {
  const { document } = await params;
  const filename = documents[document as keyof typeof documents];
  const cookieStore = await cookies();

  if (!filename || !hasValidAccessToken(cookieStore.get(accessCookieName)?.value)) {
    return NextResponse.json({ error: "Password-protected download." }, { status: 401 });
  }

  try {
    const file = await readFile(path.join(process.cwd(), "private", "portfolio", filename));
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Download unavailable." }, { status: 404 });
  }
}
