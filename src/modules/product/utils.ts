import { LIMIT } from "@/constants/request";
import { ResponseList } from "@/types/Common";
import { Product } from "@/types/Product";

export function getProductsKey(
  pageIndex,
  previousPageData: ResponseList<Product> | null,
  q: string | null | undefined
) {
  if (pageIndex > 0 && previousPageData?.products?.length === 0) return null;
  const isSearch = (q?.length || 0) > 0;
  return `/products${isSearch ? "/search" : ""}?page=${
    pageIndex + 1
  }&limit=${LIMIT}&skip=${pageIndex * LIMIT}${q ? "&q=" + q : ""}`;
}
