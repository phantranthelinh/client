import { Product } from "@/models/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProductCard from "./ProductCard";

const RelatedProducts = ({
  relatedProducts,
}: {
  relatedProducts: Product[];
}) => {
  return (
    <section className="mdLmt-[100px] mt-[50px] mb-[100px] md:mb-0">
      <hr className="py-4" />
      <h1 className="mb-8 font-bold text-3xl text-center">Sản phẩm đề xuất</h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {relatedProducts?.map((prod, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
              <ProductCard key={prod.id} data={prod} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default RelatedProducts;
