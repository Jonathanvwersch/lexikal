/** @type {import('@hey-api/openapi-ts').UserConfig} */

import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "./openapi.json",
  output: "./generated",
  plugins: [
    { dates: true, name: "@hey-api/transformers" },
    {
      name: "@hey-api/types",
      style: "PascalCase",
    },
    {
      asClass: false,
      name: "@hey-api/services",
    },
  ],
});
