import { Loading } from "@/components/common/Loading";
import Layout from "@/components/dashboard/layout";
import AddProduct from "@/components/dashboard/products/AddProduct";
import { ProductTable } from "@/components/dashboard/products/table";
import { useGetProducts } from "@/hooks/api/products/useGetProducts";
import { createLazyFileRoute } from "@tanstack/react-router";
export const Route = createLazyFileRoute("/dashboard/products/")({
  component: ProductPage,
});
function ProductPage() {
  const { isLoading, data } = useGetProducts(true);

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div className="text-2xl">Danh sách sản phẩm</div>
        <AddProduct />
      </div>
      {isLoading ? <Loading /> : <ProductTable data={data} />}
    </Layout>
  );
}
