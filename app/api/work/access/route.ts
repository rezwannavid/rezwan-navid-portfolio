import { NextResponse } from "next/server";
import { accessCookieName, createAccessToken, verifyProjectPassword } from "@/lib/workAccess";
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
  if (!project?.protected || !project.passwordIdentifier) {
    return NextResponse.json({ error: "Protected project not found." }, { status: 404 });
  }
  if (!password || password.length > 256) {
    return NextResponse.json({ error: "Enter a valid password." }, { status: 400 });
  }

  const result = verifyProjectPassword(project.passwordIdentifier, password);
  if (!result.configured) {
    return NextResponse.json({ error: "Access is not configured yet. Please contact Rezwan." }, { status: 503 });
  }
  if (!result.valid) {
    return NextResponse.json({ error: "That password is incorrect. Please try again." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(accessCookieName(slug), createAccessToken(slug), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: `/work/${slug}`,
  });
  return response;
}
