// @ts-nocheck
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "vitest-dom/matchers";
import "vitest-dom/extend-expect";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

beforeEach(() => {
  global.fetch = vi.fn();

  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});
