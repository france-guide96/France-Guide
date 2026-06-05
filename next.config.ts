import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const nextConfig = {
  trailingSlash: false,

  async redirects() {
    return [
      {
        source: "/en/gid",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/kontakty",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/tseny",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/parizh/vechernii-parizh",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/parizh/eifeleva-bashnia",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/novosti",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/franciia/mon-sen-mishel",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/parizh/grand-opera",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/parizh",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/prigorod/vo-le-vikont-pri-svechah",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/franciia/zhiverni",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/prigorod",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/parizh/mare",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/parizh/obzornaia",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/parizh/luvr",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/franciia/shampan",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/prigorod/versal",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/ekskursii/parizh/monmartr",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/ekskursii/prigorod/disneilend",
        destination: "/ru",
        permanent: true,
      },
      {
        source: "/ekskursii/parizh/latinskii-kvartal",
        destination: "/ru",
        permanent: true,
      },
      {
        source: "/ekskursii/prigorod/fontenblo",
        destination: "/ru",
        permanent: true,
      },
      {
        source: "/transfery",
        destination: "/ru",
        permanent: true,
      },
    ];
  },

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