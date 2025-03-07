import { Loading } from "@/components/common/Loading";
import Layout from "@/components/dashboard/layout";
import { OrderTable } from "@/components/dashboard/order/table";
import { useGetOrders } from "@/hooks/api/orders/useGetOrders";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/orders/")({
  component: OrderPage,
});

function OrderPage() {
  const { isLoading, data } = useGetOrders({ isAdmin: true });
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div className="text-2xl">Quản lý đơn hàng</div>
      </div>
      {isLoading ? <Loading /> : <OrderTable data={data} />}
    </Layout>
  );
}
