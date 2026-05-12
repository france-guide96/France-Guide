import { createNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: ["ru", "en"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
});
