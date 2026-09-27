import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isFeatureEnabled } from "@/lib/features";

// Request-time gate for disabled features. The in-page notFound() guard in
// e.g. src/app/gallery/page.tsx is not honored for statically prerendered
// routes, so disabled routes are rewritten to the not-found page here.
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (
    (!isFeatureEnabled("gallery") && pathname.startsWith("/gallery")) ||
    (!isFeatureEnabled("notes") && pathname.startsWith("/notes")) ||
    (!isFeatureEnabled("projects") && pathname.startsWith("/projects")) ||
    (!isFeatureEnabled("listening") && pathname.startsWith("/listening"))
  ) {
    return NextResponse.rewrite(new URL("/_not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/gallery/:path*",
    "/notes/:path*",
    "/projects/:path*",
    "/listening/:path*",
  ],
};
