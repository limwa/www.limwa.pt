import { defineConfig, passthroughImageService } from 'astro/config';

import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.limwa.pt",

  integrations: [
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
          ]
        },
      ]
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
    service: passthroughImageService()
  },

  redirects: {
    "/cv.pdf": {
      status: 302,
      destination: "/resume.pdf",
    },
  },
});