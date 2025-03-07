import MainLayout from "@/components/client/layout";
import ProductDetailsCarousel from "@/components/client/ProductDetailsCarousel";
import RelatedProducts from "@/components/client/RelatedProducts";
import Review from "@/components/client/Review";
import { Loading } from "@/components/common/Loading";
import Wrapper from "@/components/common/Wrapper";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetProductBySlug } from "@/hooks/api/products/useGetProductBySlug";
import { useGetRelatedProducts } from "@/hooks/api/products/useGetRelatedProducts";
import { addToCart, TCartItem } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { parseHtml } from "@/utils/parse-html";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
export const Route = createLazyFileRoute("/products/$productName/")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productName } = Route.useParams();
  const { isLoading, data: product } = useGetProductBySlug(productName);
  const { data: relatedProducts } = useGetRelatedProducts(productName);

  const [size, setSize] = useState({
    size: "",
    quantity: 1,
  });

  const handleQty = (type: "inc" | "dec") => () => {
    if (type === "inc") {
      setSize((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
    } else {
      if (size.quantity === 1) return;
      setSize((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
    }
  };

  const handleSelectedSize = (size: string) => {
    setSize({
      size,
      quantity: 1,
    });
  };

  const handleAddingToCart = () => {
    const data = {
      ...product,
      ...size,
      cartItemId: Math.random().toString(36).substring(2, 15),
    };
    addToCart(data as TCartItem);
  };

  return (
    <main className="w-full">
      <MainLayout>
        <Wrapper className="p-10 min-h-[calc(100vh-100px)]">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <section className="flex lg:flex-row flex-col gap-[50px] lg:gap-[100px] md:px-10">
                <div className="flex-[1.5] lg-mx-0 mx-auto w-full md:w-auto max-w-[500px] lg:max-w-full">
                  <ProductDetailsCarousel product={product} />
                  <div>
                    <div className="mb-5 font-bold text-lg">
                      {product?.name?.toUpperCase()} - CHI TIẾT SẢN PHẨM
                    </div>
                    <div className="mb-5 text-md markdown">
                      <div>{parseHtml(product?.description)}</div>
                    </div>
                  </div>
                  <Review />
                </div>

                <div className="flex flex-col flex-1 gap-4">
                  <h1 className="mb-2 font-semibold text-[34px] leading-tight">
                    {product?.name?.toUpperCase()}
                  </h1>

                  <p>{product?.shortDescription}</p>

                  <div className="flex items-center">
                    <p className="mr-2 font-semibold text-lg">
                      {formatCurrencyVND(product?.price)}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span>Size</span>
                      <Link href="/products/size-chart">Size chart</Link>
                    </div>
                    <Select onValueChange={handleSelectedSize}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn kích cỡ" />
                      </SelectTrigger>
                      <SelectContent>
                        {product?.sizes.map((size) => {
                          return (
                            <SelectItem value={size.size} key={size.size}>
                              {size.size}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>Số lượng</div>
                    <div className="flex gap-2 md:gap-6 text-gray-600 text-sm md:text-md">
                      <div className="flex items-center gap-3 w-full">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={handleQty("dec")}
                        >
                          <Minus />
                        </Button>
                        <span className="font-medium text-lg">
                          {size?.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleQty("inc")}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={size.size === ""}
                    className="bg-black hover:opacity-75 mb-3 py-6 rounded-none w-full font-medium text-lg text-white transition-transform active:scale-95"
                    onClick={handleAddingToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </section>
            </>
          )}

          {relatedProducts?.length > 0 && (
            <RelatedProducts relatedProducts={relatedProducts} />
          )}
        </Wrapper>
      </MainLayout>
    </main>
  );
}
