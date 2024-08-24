import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import VueDevTools from "vite-plugin-vue-devtools"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
      "~icons": fileURLToPath(new URL("./node_modules/vue-material-design-icons", import.meta.url)),
      "~translations": fileURLToPath(new URL("./src/i18n/generated/runtime.js", import.meta.url))
    }
  }
})
