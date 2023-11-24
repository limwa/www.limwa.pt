import { defineConfig, passthroughImageService } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.limwa.pt",

  integrations: [solidJs(), tailwind()],

  output: "hybrid",
  adapter: cloudflare(),

  image: {
    service: passthroughImageService(),
  },
});