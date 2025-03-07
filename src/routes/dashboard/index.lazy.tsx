import { Loading } from "@/components/common/Loading";
import Layout from "@/components/dashboard/layout";
import { BarChartMonthly } from "@/components/dashboard/revenue/Barchart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetPendingOrder } from "@/hooks/api/orders/useGetOrder";
import { useGetOverviews } from "@/hooks/api/overview/useGetOverview";
import { useGetDataChartMonthly } from "@/hooks/api/revenue/useGetDataChart";
import { RevenueChart } from "@/models/chart";
import { Order } from "@/models/order";
import { formatCurrencyVND } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  DollarSign,
  PackageSearch,
  ShoppingBasket,
  UserRound,
} from "lucide-react";

export const Route = createLazyFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { isLoading, data } = useGetOverviews();
  const { data: pendingOrders } = useGetPendingOrder();

  const currentMonth = new Date().getMonth() + 1;
  const { data: dataChart } = useGetDataChartMonthly(currentMonth);
  return (
    <Layout>
      <h2 className="text-3xl">Tổng quan</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-4">
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-4">
            <Card className="relative px-4 py-8 overflow-hidden">
              <div className="-top-10 -left-10 z-0 absolute bg-black/[0.3] rounded-full w-[160px] h-[160px]"></div>
              <Link to="/dashboard/revenue" className="z-10 flex gap-2">
                <DollarSign className="size-8" />
                <div className="z-10 ml-auto w-[180px]">
                  Doanh thu tháng này:{" "}
                  <b>{formatCurrencyVND(data?.totalMonthlyIncome)}</b>
                </div>
              </Link>
            </Card>
            <Card className="relative px-4 py-8 overflow-hidden">
              <div className="-top-10 -left-10 z-0 absolute bg-black/[0.3] rounded-full w-[160px] h-[160px]"></div>
              <Link to="/dashboard/orders" className="z-10 flex gap-2">
                <ShoppingBasket className="size-8" />
                <div className="z-10 ml-auto">
                  Đơn hàng mới : {data?.totalOrders}
                </div>
              </Link>
            </Card>
            <Card className="relative px-4 py-8 overflow-hidden">
              <div className="-top-10 -left-10 z-0 absolute bg-black/[0.3] rounded-full w-[160px] h-[160px]"></div>
              <Link to="/dashboard/customers" className="z-10 flex gap-2">
                <UserRound className="size-8" />
                <div className="z-10 ml-auto">
                  Khách hàng mới : {data?.totalUsers}
                </div>
              </Link>
            </Card>
            <Card className="relative px-4 py-8 overflow-hidden">
              <div className="-top-10 -left-10 z-0 absolute bg-black/[0.3] rounded-full w-[160px] h-[160px]"></div>
              <Link to="/dashboard/products" className="z-10 flex gap-2">
                <PackageSearch className="size-8" />
                <div className="z-10 ml-auto">
                  Sản phẩm hiện có : {data?.totalProducts}
                </div>
              </Link>
            </Card>
          </div>
          <div className="gap-4 grid grid-cols-2 mt-4">
            {pendingOrders?.length > 0 && (
              <div className="gap-4 grid grid-cols-1 w-full">
                <Card className="py-4">
                  <h6 className="mb-4 ml-2 text-2xl">Đơn hàng chờ xử lý</h6>
                  <ScrollArea className="max-h-[400px]">
                    <div className="flex flex-col gap-4">
                      {pendingOrders?.map((item: Order) => {
                        return (
                          <Link
                            to={`/dashboard/orders/${item._id}`}
                            key={item._id}
                            className="flex gap-4 hover:bg-gray-100 px-2 hover:cursor-pointer"
                          >
                            <Avatar>
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{formatDate(item.createdAt)}</div>
                              <p>
                                {item.user.name}, {item.orderItems.length}
                              </p>
                            </div>
                            <div className="ml-auto">
                              {formatCurrencyVND(item.totalPrice)}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </Card>
              </div>
            )}
            <Card className="p-4 w-full">
              <h2 className="mb-4 font-semibold text-2xl">
                Doanh thu trong tháng
              </h2>
              <BarChartMonthly data={dataChart.data as RevenueChart[]} />
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
}
