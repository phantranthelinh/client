import { Product } from "@/models/product";
import ProductCard from "../../ProductCard";

const ProductList = ({ data }: { data?: Product[] }) => {
  return (
    <section className="place-items-center gap-5 lg:gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-14 md:px-0 w-full">
      <>
        {data?.map((product: Product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </>
    </section>
  );
};

export default ProductList;
