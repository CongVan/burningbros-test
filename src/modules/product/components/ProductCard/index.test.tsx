import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from ".";
import { product } from "./data.mock";

// The two tests marked with concurrent will be run in parallel
describe("Product Card", () => {
  it("test render card correctly", () => {
    render(<ProductCard {...product} />);
    expect(screen.getByTestId("title")).toHaveTextContent(product.title);
    expect(screen.getByTestId("description")).toHaveTextContent(
      product.description
    );
    expect(screen.getByTestId("price")).toHaveTextContent(product.price + "");
    expect(screen.getByTestId("thumbnail")).toHaveAttribute("src", "");
  });
});
