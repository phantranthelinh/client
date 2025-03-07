import { Loading } from "@/components/common/Loading";
import { CustomerTable } from "@/components/dashboard/customers/table";
import Layout from "@/components/dashboard/layout";
import { useGetUsers } from "@/hooks/api/users/useGetUsers";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/customers/")({
  component: CustomerPage,
});

function CustomerPage() {
  const { isLoading, data } = useGetUsers();

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div className="text-2xl">Quản lý khách hàng</div>
      </div>
      {isLoading ? <Loading /> : <CustomerTable data={data} />}
    </Layout>
  );
}
