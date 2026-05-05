"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import LanguageSwitcher from "@/app/shared/LanguageSwitcher/languageSwitcher";
import { Logo } from "@/app/shared/Logo";
import Container from "@/app/shared/Container";
import { categories } from "./type";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-dark-gray">
      <Container>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col xl:flex-row justify-start md:justify-between gap-[50px] mb-8">
            <div className="flex-1">
              <Logo className="mb-4" />
              <p className="text-secondary/50 text-sm max-w-[200px]">
                {t("DiscoverParis")}
              </p>
            </div>
            <div className="flex-1 flex justify-between gap-[20px] flex-wrap">
              <div>
                <h4 className="text-secondary font-semibold mb-4">
                  {t("Tours")}
                </h4>
                <ul className="space-y-4">
                  {categories?.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`/${locale}${item.path}`}
                        className="group relative flex items-center text-secondary/50 text-sm transition-all duration-300 hover:text-accent pl-0"
                      >
                        <span className="transition-transform duration-300 whitespace-nowrap">
                          {t(item.key)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-secondary font-semibold mb-4">
                  {t("Company")}
                </h4>
                <ul className="space-y-2 text-secondary/50 text-sm">
                  <li>
                    <a
                      href={"/about"}
                      className="hover:text-accent transition-colors"
                    >
                      {t("About")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-accent transition-colors">
                      {t("Reviews")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-accent transition-colors">
                      {t("Contacts")}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-secondary font-semibold mb-4">
                  {t("Contacts")}
                </h4>
                <ul className="space-y-2 text-secondary/50 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{t("Address")}</span>
                  </li>
                  <li>+33-609-57-27-80</li>
                  <li>garik@france-gid.ru</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <LanguageSwitcher />
          </div>
          <div className="border-t border-dark-gray pt-8 text-center text-secondary/50 text-sm">
            <p>
              &copy; {CURRENT_YEAR} Elite Paris Guide. {t("AllRights")}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
