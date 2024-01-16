import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://www.limwa.pt",
  integrations: [
    mdx(),
    solidJs(),
    tailwind(),
    sitemap(),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: [
            // Cloudflare-specific endpoints that should not be indexed
            "/cdn-cgi/",
          ],
        }
      ],
    }),
  ],
  output: "hybrid",
  adapter: cloudflare({
    runtime: {
      mode: "local",
      type: "pages",
    },
  }),
  image: {
    service: passthroughImageService(),
  },
  redirects: {
    "/CV.pdf": {
      status: 302,
      destination: "/resume.pdf",
    },
  },
});