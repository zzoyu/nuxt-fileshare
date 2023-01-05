import { describe, test, expect } from "vitest";
import { setup, $fetch, isDev } from "@nuxt/test-utils";

// describe("Environment", () => {
//   setup({});

//   test("")
// });

describe("API request Test", () => {
  setup({});
  test("request wrong file", async () => {
    const response = await $fetch("/api/file/test.pdf");

    expect(response).toEqual({
      error: "file not found",
    });
  });

  test("request out of bound", async () => {
    const response = await $fetch("/api/files?page=1000");

    expect(response).toHaveProperty("error");
  });
});
