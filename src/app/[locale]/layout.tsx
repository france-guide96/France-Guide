import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ModalProvider } from "@/context/ModalContext";
import { NextIntlClientProvider } from "next-intl";
import ContactModalWrapper from "../shared/ContactModalWrapper";
import { Metadata } from "next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  return {
    metadataBase: new URL("https://france-gid.vercel.app"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ru: "/ru", en: "/en" },
    },
    openGraph: {
      url: "https://france-gid.vercel.app",
      siteName: "France Guide",
      locale: isRu ? "ru_RU" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "France Guide",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og-image.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const currentLocale = locale === "en" ? "en" : "ru";

  const messages =
    currentLocale === "en"
      ? (await import("@/messages/en.json")).default
      : (await import("@/messages/ru.json")).default;

  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          <ModalProvider>
            <ContactModalWrapper />
            {children}
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
