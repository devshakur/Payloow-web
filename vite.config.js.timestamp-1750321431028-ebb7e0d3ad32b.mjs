// vite.config.js
import { defineConfig } from "file:///C:/devshakur/Payloow/Revo-Frontend-Web/node_modules/vite/dist/node/index.js";
import react from "file:///C:/devshakur/Payloow/Revo-Frontend-Web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/devshakur/Payloow/Revo-Frontend-Web/node_modules/vite-plugin-pwa/dist/index.js";
var manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["favicon.ico", "apple-touch-icon.png", "maskable-icon.png"],
  manifest: {
    name: "Payloow",
    short_name: "Payloow",
    description: "All Your Financial, Learning, and Shopping Needs in One Place",
    icons: [
      {
        src: "./android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "./android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "./apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      },
      {
        src: "./maskable-icon.png",
        sizes: "225x225",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA({ manifestForPlugIn })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxkZXZzaGFrdXJcXFxcUGF5bG9vd1xcXFxSZXZvLUZyb250ZW5kLVdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcZGV2c2hha3VyXFxcXFBheWxvb3dcXFxcUmV2by1Gcm9udGVuZC1XZWJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L2RldnNoYWt1ci9QYXlsb293L1Jldm8tRnJvbnRlbmQtV2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5cclxuY29uc3QgbWFuaWZlc3RGb3JQbHVnSW4gPSB7XHJcbiAgcmVnaXN0ZXJUeXBlOiBcInByb21wdFwiLFxyXG4gIGluY2x1ZGVBc3Nlc3RzOiBbXCJmYXZpY29uLmljb1wiLCBcImFwcGxlLXRvdWNoLWljb24ucG5nXCIsIFwibWFza2FibGUtaWNvbi5wbmdcIl0sXHJcbiAgbWFuaWZlc3Q6IHtcclxuICAgIG5hbWU6IFwiUGF5bG9vd1wiLFxyXG4gICAgc2hvcnRfbmFtZTogXCJQYXlsb293XCIsXHJcbiAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgXCJBbGwgWW91ciBGaW5hbmNpYWwsIExlYXJuaW5nLCBhbmQgU2hvcHBpbmcgTmVlZHMgaW4gT25lIFBsYWNlXCIsXHJcbiAgICBpY29uczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgc3JjOiBcIi4vYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmdcIixcclxuICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICBwdXJwb3NlOiBcImZhdmljb25cIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHNyYzogXCIuL2FuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nXCIsXHJcbiAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgcHVycG9zZTogXCJmYXZpY29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBzcmM6IFwiLi9hcHBsZS10b3VjaC1pY29uLnBuZ1wiLFxyXG4gICAgICAgIHNpemVzOiBcIjE4MHgxODBcIixcclxuICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgIHB1cnBvc2U6IFwiYXBwbGUgdG91Y2ggaWNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgc3JjOiBcIi4vbWFza2FibGUtaWNvbi5wbmdcIixcclxuICAgICAgICBzaXplczogXCIyMjV4MjI1XCIsXHJcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICBwdXJwb3NlOiBcImFueSBtYXNrYWJsZVwiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIHRoZW1lX2NvbG9yOiBcIiMxNzE3MTdcIixcclxuICAgIGJhY2tncm91bmRfY29sb3I6IFwiI2YwZTdkYlwiLFxyXG4gICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcbiAgICBzY29wZTogXCIvXCIsXHJcbiAgICBzdGFydF91cmw6IFwiL1wiLFxyXG4gICAgb3JpZW50YXRpb246IFwicG9ydHJhaXRcIixcclxuICB9LFxyXG59O1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgVml0ZVBXQSh7IG1hbmlmZXN0Rm9yUGx1Z0luIH0pXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFMsU0FBUyxvQkFBb0I7QUFDelUsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUV4QixJQUFNLG9CQUFvQjtBQUFBLEVBQ3hCLGNBQWM7QUFBQSxFQUNkLGdCQUFnQixDQUFDLGVBQWUsd0JBQXdCLG1CQUFtQjtBQUFBLEVBQzNFLFVBQVU7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGFBQ0U7QUFBQSxJQUNGLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxJQUNBLGFBQWE7QUFBQSxJQUNiLGtCQUFrQjtBQUFBLElBQ2xCLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxFQUNmO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ25ELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
