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

  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  if (!token && !isAuthPath && !isOAuthPath && !isOnboardingPath && !isAgentsPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && (isAuthPath || isOnboardingPath)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)"],
};
