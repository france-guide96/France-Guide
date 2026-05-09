import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales: readonly string[] = ["ru", "en"];
const defaultLocale: string = "ru";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameLocale) {
    if (cookieLocale !== pathnameLocale) {
      const response = NextResponse.next();
      response.cookies.set("NEXT_LOCALE", pathnameLocale, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
      return response;
    }
    return NextResponse.next();
  }

  const targetLocale = cookieLocale || defaultLocale;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${targetLocale}`, request.url));
  }

  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${targetLocale}${pathname}`;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|woff2)).*)",
  ],
};
