import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  // `next lint` scoped itself to the source directories. The ESLint CLI that
  // replaces it in Next 16 walks everything, so build output and the generated
  // design-system bundles have to be excluded by hand.
  globalIgnores([
    ".next/**",
    ".next-*/**",
    "out/**",
    "ds-bundle/**",
    ".design-sync/**",
    "next-env.d.ts",
  ]),
  {
    extends: [...nextCoreWebVitals],
  },
]);
