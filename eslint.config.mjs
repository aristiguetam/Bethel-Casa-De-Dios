import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Stitch design comps reference external CDN images at runtime; using a
      // plain <img> tag preserves the Stitch markup 1:1 without forcing every
      // hero shot through next/image.
      "@next/next/no-img-element": "off",
      // App Router supports <link> tags inside layout <head>; the Pages Router
      // rule does not apply here.
      "@next/next/no-page-custom-font": "off",
    },
  },
]);

export default eslintConfig;
