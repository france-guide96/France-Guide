import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { ModalProvider } from "@/context/ModalContext";
import ContactModalWrapper from "../shared/ContactModalWrapper";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const locales = ["ru", "en"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ModalProvider>
            {children}
            <ContactModalWrapper />
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
