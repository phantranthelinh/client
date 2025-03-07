import ProductList from "@/components/client/Home/ProductList";
import MainLayout from "@/components/client/layout";
import { Loading } from "@/components/common/Loading";
import { useGetProductByCategory } from "@/hooks/api/products/useGetProductByCategory";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/category/$categoryName")({
  component: CategoryPage,
});

function CategoryPage() {
  const { categoryName } = Route.useParams();
  const { data, isLoading } = useGetProductByCategory(categoryName);

  return (
    <MainLayout classNames="min-h-[60vh]">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2 className="font-bold text-3xl">{data?.data?.name}</h2>
          <div className="flex justify-center max-w-screen-lg">
            <ProductList data={data?.data} />
          </div>
        </>
      )}
    </MainLayout>
  );
}
