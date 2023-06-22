import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import { mockFetchResponse } from "@/tests/utils";
import ProductListTemplate from ".";
import { list } from "./data.mock";
import { Params } from "react-router-dom";

// The two tests marked with concurrent will be run in parallel
describe("Product List Template", () => {
  beforeEach(() => {
    vi.mock("react-router-dom", () => ({
      useSearchParams: () => [new URLSearchParams()],
    }));
    fetch.mockResolvedValue(mockFetchResponse(list));
    render(<ProductListTemplate />);
  });
  it("test call api", () => {
    expect(fetch).toHaveBeenCalledWith(
      import.meta.env.VITE_API_URL + "/products?page=1&limit=20&skip=0"
    );
  });
});
