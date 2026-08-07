import { NextResponse } from "next/server";

/**
 * Annotate requests with locale for SSR `<html lang>`.
 * Does not redirect — language choice stays URL + jamana-lang driven.
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;
  const locale =
    pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-jamana-locale", locale);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api/|favicon.ico|.*\\..*).*)",
  ],
};
