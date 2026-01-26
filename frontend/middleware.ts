import { NextResponse } from "next/server";

import { ASSESS_TOKEN } from "@/utils/constants";

import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get(ASSESS_TOKEN)?.value ?? null;
  const { pathname } = request.nextUrl;
  const isAuthPath = pathname.startsWith("/auth");
  const isOAuthPath = pathname.startsWith("/oauth");
  const isOnboardingPath = pathname.startsWith("/onboarding");

  const isAgentsPath = pathname.startsWith("/agents");

  if (token && (isAuthPath || isOnboardingPath || isOAuthPath)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Define public paths that don't require token
  const isPublicPath =
    pathname === "/" ||
    isAuthPath ||
    isOAuthPath ||
    isOnboardingPath ||
    isAgentsPath ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms");

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)"],
};
