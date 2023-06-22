import { Product } from "@/types/Product";
import { useEffect, useRef, useState } from "react";

interface ProductCardProps extends Product {}

function ProductCard({
  price,
  title,
  thumbnail,
  description,
}: ProductCardProps) {
  const [lazySrc, setLazySrc] = useState("");
  const cardRef = useRef(null);
  const onInView = () => {
    if (!lazySrc) setLazySrc(thumbnail);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(onInView, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);
  return (
    <div
      ref={cardRef}
      className="card card-compact bg-base-100 hover:shadow-2xl hover:shadow-accent-focus hover:-translate-y-1 hover:z-[1] origin-bottom transition-all"
    >
      <figure className="relative pt-[100%] bg-base-200">
        <img
          data-testid="thumbnail"
          src={lazySrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title" data-testid="title">
          {title}
        </h2>
        <p data-testid="description" className=" line-clamp-3 p-0 flex-none">
          {description}
        </p>
        <p data-testid="price" className="font-bold text-lg">
          {price}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
