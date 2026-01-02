import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar"], // Supported locales
  defaultLocale: "en", // Default locale
});

export const config = {
  matcher: ["/(en|ar)/:path*"], // Only match i18n routes (exclude root)
};
