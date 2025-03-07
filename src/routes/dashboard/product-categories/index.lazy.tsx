import { Loading } from "@/components/common/Loading";
import AddCategory from "@/components/dashboard/categories/AddCategory";
import { CategoryTable } from "@/components/dashboard/categories/DataTable";
import Layout from "@/components/dashboard/layout";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/product-categories/")({
  component: CategoryPage,
});

function CategoryPage() {
  const { isLoading, data } = useGetCategories();
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div className="text-2xl">Danh sách danh mục sản phẩm</div>
        <AddCategory />
      </div>
      {isLoading ? <Loading /> : <CategoryTable data={data} />}
    </Layout>
  );
}
