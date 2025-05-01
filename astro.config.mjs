import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import node from '@astrojs/node';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],
  output: 'server', // Habilitar SSR para procesar formularios
  adapter: node({
    mode: 'standalone' // Modo standalone para VPS
  }),
});