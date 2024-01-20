/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "sanity-plugin-seo-pane",
    "lodash-es",
    "yoastseo",
    "@yoast",
  ],
  experimental: {
    serverComponentsExternalPackages: ['pdf2json'],
  },
};

module.exports = nextConfig;
