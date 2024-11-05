import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["favicon.ico", "apple-touch-icon.png", "maskable-icon.png"],
  manifest: {
    name: "Payloow",
    short_name: "Payloow",
    description:
      "All Your Financial, Learning, and Shopping Needs in One Place",
    icons: [
      {
        src: "./android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "./android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "./apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "./maskable-icon.png",
        sizes: "225x225",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ manifestForPlugIn })],
});
