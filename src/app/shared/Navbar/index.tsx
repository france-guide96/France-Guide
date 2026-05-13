"use client";

import { useState } from "react";
import { usePathname } from "@/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Container from "@/app/shared/Container";
import Button from "@/app/shared/Button";
import LanguageSwitcher from "@/app/shared/LanguageSwitcher/languageSwitcher";
import { Logo } from "@/app/shared/Logo";
import { navData } from "@/constants/navbarData";
import { PathnameEnum } from "@/constants/pathName";
import menuIcon from "@/assets/elements/menu.png";
import closeIcon from "@/assets/elements/close.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const normalizedPath = pathname.replace(`/${locale}`, "") || "/";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleContactClick = () => {
    document
      .getElementById("getInTouch")
      ?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (normalizedPath === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="fixed z-[888] inset-x-0 bg-primary/90 border-b border-secondary/10">
        <Container>
          <div className="flex justify-between items-center py-[18px] px-[20px]">
            <Link
              href={`/${locale}`}
              onClick={handleLogoClick}
              style={{ fontFamily: "Oswald" }}
            >
              <Logo />
            </Link>

            <ul className="hidden lg:flex justify-center items-center lg:gap-[16px] 2xl:gap-[32px] px-[20px] 2xl:px-[0px]">
              {navData &&
                navData.map((item) => {
                  const fullPath = `/${locale}${item.path}`;
                  const isActive =
                    item.path === PathnameEnum.HOME
                      ? normalizedPath === "/"
                      : normalizedPath === item.path ||
                        normalizedPath.startsWith(item.path);

                  return (
                    <Link
                      key={item?.path}
                      href={fullPath}
                      className="lg:text-[14px] 2xl:text-[16px] text-secondary relative py-1 group transition-colors duration-300"
                    >
                      {t(item.key)}

                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "w-full opacity-100 shadow-[0_0_8px_rgba(202,138,4,0.4)]"
                      : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50"
                  }
                `}
                      />
                    </Link>
                  );
                })}
            </ul>
            <div className="hidden lg:flex justify-between lg:gap-[10px] 2xl:gap-[32px]">
              <Button
                onClick={handleContactClick}
                text={t("BookATour")}
                styles="lg:text-[12px] 2xl:text-[16px] rounded-[6px] lg:px-[12px] 2xl:px-[24px] py-[10px] font-[600]"
                designType="gold"
              />
              <LanguageSwitcher />
            </div>

            <Button styles="lg:hidden" onClick={toggleMenu}>
              <Image
                src={isMenuOpen ? closeIcon : menuIcon}
                alt={isMenuOpen ? "Navbar close icon" : "Navbar menu icon"}
                className="w-[30px] h-[30px]"
              />
            </Button>
          </div>
          {isMenuOpen && (
            <div className="xl:hidden flex flex-col items-start gap-[20px] bg-primary/1 p-[20px] rounded-xl">
              {navData &&
                navData.map((item, index) => (
                  <Link
                    key={index}
                    href={`/${locale}${item.path}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[16px] font-[400] text-secondary"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              <div className="pt-[10px] border-t border-white/10 w-full flex justify-between items-center">
                <LanguageSwitcher />
                <Button
                  text={t("BookATour")}
                  styles="text-[12px] rounded-[2px] px-[18px] py-[6px] font-[600]"
                  designType="gold"
                  onClick={handleContactClick}
                />
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
