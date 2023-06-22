import { LIMIT } from "@/constants/request";
import { fetcher } from "@/libs/fetcher";
import { ResponseList } from "@/types/Common";
import { Product } from "@/types/Product";
import { Fragment, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import useSWRInfinite from "swr/infinite";

import ProductCard from "../../components/ProductCard";

import { useSearchParams } from "react-router-dom";
import { getProductsKey } from "../../utils";

interface ProductListTemplateProps {}

function ProductListTemplate({}: ProductListTemplateProps) {
  const [params] = useSearchParams();

  const { data, size, setSize, isLoading } = useSWRInfinite<
    ResponseList<Product>
  >(
    (pageIndex, prevData) =>
      getProductsKey(pageIndex, prevData, params.get("q")),
    fetcher
  );

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = useMemo(() => {
    return (data?.[0]?.products?.length || 0) === 0;
  }, [data]);

  const isReachingEnd = useMemo(() => {
    return isEmpty || (data && data[data.length - 1]?.products.length < LIMIT);
  }, [isEmpty, data]);

  const loadMore = () => {
    if (isLoadingMore) return;
    setSize(size + 1);
  };

  return (
    <div className="container mx-auto mt-4">
      {!data ? (
        <>Loading...</>
      ) : isEmpty ? (
        <>Not found any product</>
      ) : (
        <>
          <div className=" mb-4">
            Found <span className="font-bold">{data[0].total}</span> products
          </div>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={!isReachingEnd}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {data.map((d, i) => (
                <Fragment key={i}>
                  {d.products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </Fragment>
              ))}
            </div>
            {isLoadingMore ? (
              <div className="p-10 w-full text-center"> Loading more...</div>
            ) : null}
            {isReachingEnd ? (
              <div className="p-10 w-full text-center">
                All product are showing
              </div>
            ) : null}
          </InfiniteScroll>
        </>
      )}
      {/* <div ref={ref} className="w-full h-1"></div> */}
    </div>
  );
}

export default ProductListTemplate;
