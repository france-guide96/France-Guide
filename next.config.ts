import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapicms-production.up.railway.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wise-creativity-c9c0a41985.media.strapiapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wise-creativity-c9c0a41985.strapiapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
} satisfies import("next").NextConfig;

export default withNextIntl(nextConfig);
