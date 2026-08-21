import { NextResponse } from "next/server";
import { accessCookieName, createAccessToken, verifyCaseStudyPassword } from "@/lib/workAccess";
import { getWorkProject } from "@/lib/workProjects";

export async function POST(request: Request) {
  let body: { slug?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug : "";
  const password = typeof body.password === "string" ? body.password : "";
  const project = getWorkProject(slug);
  if (slug !== "portfolio" && !project?.protected) {
    return NextResponse.json({ error: "Protected project not found." }, { status: 404 });
  }
  if (!password || password.length > 256) {
    return NextResponse.json({ error: "Enter a valid password." }, { status: 400 });
  }

  const result = verifyCaseStudyPassword(password);
  if (!result.configured) {
    return NextResponse.json({ error: "Access could not be verified." }, { status: 503 });
  }
  if (!result.valid) {
    return NextResponse.json({ error: "Access could not be verified." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(accessCookieName, createAccessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return response;
}
