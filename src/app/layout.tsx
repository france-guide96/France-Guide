import type { Metadata } from "next";

const BASE_URL = "https://france-gid.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "France Guide | Экскурсии по Франции с русскоговорящим гидом",
    template: "%s | France Guide",
  },
  description:
    "Лучшие экскурсии по Парижу и Франции с русскоговорящим гидом. Лувр, Версаль, Монмартр, замки Луары и многое другое.",
  authors: [{ name: "France Guide" }],
  creator: "France Guide",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "France Guide",
    title: "France Guide | Экскурсии по Франции с русскоговорящим гидом",
    description:
      "Лучшие экскурсии по Парижу и Франции с русскоговорящим гидом.",
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
    title: "France Guide | Экскурсии по Франции с русскоговорящим гидом",
    description:
      "Лучшие экскурсии по Парижу и Франции с русскоговорящим гидом.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
