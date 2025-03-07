import { Product } from "@/models/product";

const ProductDetailsCarousel = ({ product }: { product?: Product }) => {
  return (
    <div className="mx-auto w-full max-w-[1360px] text-[20px] text-white x">
      <img src={product?.image} alt={product?.name} />
    </div>
  );
};

export default ProductDetailsCarousel;
