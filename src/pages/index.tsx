import ProductSearchInput from "@/modules/product/components/ProductSearchInput";
import ProductListTemplate from "../modules/product/templates/ProductListTemplate";

export default function HomePage() {
  return (
    <div className="mt-10">
      <ProductSearchInput />
      <ProductListTemplate />
    </div>
  );
}
