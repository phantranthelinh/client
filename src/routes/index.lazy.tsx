import Hero from "@/components/client/Hero";
import HeadingText from "@/components/client/Home/HeadingText";
import ProductList from "@/components/client/Home/ProductList";
import MainLayout from "@/components/client/layout";
import { Loading } from "@/components/common/Loading";
import Wrapper from "@/components/common/Wrapper";
import { useGetProducts } from "@/hooks/api/products/useGetProducts";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
function HomePage() {
  const { data, isLoading } = useGetProducts();

  return (
    <main>
      <MainLayout>
        <Hero />
        <Wrapper>
          <HeadingText />
          {isLoading ? <Loading /> : <ProductList data={data?.products} />}
        </Wrapper>
      </MainLayout>
    </main>
  );
}
