import { Loading } from "@/components/common/Loading";
import OrderStatusText from "@/components/common/OrderStatus";
import Layout from "@/components/dashboard/layout";
import OrderItems from "@/components/dashboard/order/OrderItems";
import ShippingAddress from "@/components/dashboard/order/ShippingAddress";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetOrder } from "@/hooks/api/orders/useGetOrder";
import { useUpdateOrderStatus } from "@/hooks/api/orders/useUpdateStatusOrder";
import { Order } from "@/models/order";
import { formatCurrencyVND } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { getOrderCode } from "@/utils/helper";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/dashboard/orders/$orderId/")({
  component: OrderDetail,
});

function OrderDetail() {
  const { orderId } = Route.useParams();

  const { data, isLoading } = useGetOrder(orderId);

  const [orderStatus, setOrderStatus] = useState(() => data?.orderStatus);

  const handleChangeOrderStatus = (orderStatus: string) => {
    setOrderStatus(orderStatus);
  };

  const { mutate: updateOrderStatus } = useUpdateOrderStatus(orderId);

  const handleSave = async (status?: string) => {
    if (status) {
      updateOrderStatus(
        { orderStatus: status },
        {
          onSuccess: () => {
            toast.success("Cập nhật trạng thái đơn hàng thành công!");
          },
          onError: () => {
            toast.success("Lỗi");
          },
        }
      );
    } else {
      updateOrderStatus(
        { orderStatus: orderStatus as string },
        {
          onSuccess: () => {
            toast.success("Cập nhật trạng thái đơn hàng thành công!");
          },
          onError: () => {
            toast.success("Lỗi");
          },
        }
      );
    }
  };
  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <Link to="/dashboard/orders" className="flex gap-2 mb-4">
            <ChevronLeft />
            Trở về trang đơn hàng
          </Link>
          <div className="flex gap-10">
            <div className="flex flex-col flex-1 gap-4">
              <div className="font-bold text-2xl">Đơn hàng</div>
              <div className="space-y-2">
                <div>Mã đơn hàng: {getOrderCode(data?._id)} </div>
                <div>Ngày đặt hàng: {formatDate(data?.createdAt ?? "")}</div>

                {data?.orderStatus !== "pending" && (
                  <div className="flex items-center gap-2">
                    Trạng thái:
                    <Select
                      onValueChange={handleChangeOrderStatus}
                      value={orderStatus}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Đã đặt hàng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          Chưa hàng tất đặt hàng
                        </SelectItem>
                        <SelectItem value="isOrdered">Đã đặt hàng</SelectItem>
                        <SelectItem value="isDelivering">
                          Đang giao hàng
                        </SelectItem>
                        <SelectItem value="isDelivered">
                          Đã giao hàng
                        </SelectItem>
                        <SelectItem value="isCancelled">Đã huỷ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <OrderItems data={data?.orderItems as Order["orderItems"]} />
              <div>
                <div className="mb-4 font-bold text-2xl">Tổng</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    Tạm tính:
                    <b>{formatCurrencyVND(data?.totalPrice)}</b>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    Phí vận chuyển: <b>{formatCurrencyVND(0)}</b>
                  </div>
                  <hr />

                  <div className="flex justify-between">
                    Thành tiền:
                    {data?.isPaid ? (
                      <OrderStatusText
                        classNames="text-green-500"
                        status="Đã thanh toán"
                      />
                    ) : (
                      <b>{formatCurrencyVND(data?.totalPrice)}</b>
                    )}
                  </div>
                  <hr />
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <Button
                  disabled={orderStatus === data?.orderStatus}
                  onClick={() => handleSave()}
                >
                  Lưu
                </Button>
                {!data?.isPaid && (
                  <Button
                    className=""
                    variant={"destructive"}
                    onClick={() => {
                      handleSave("isCancelled");
                    }}
                  >
                    Huỷ đơn
                  </Button>
                )}
              </div>
            </div>

            <ShippingAddress data={data as Order} />
          </div>
        </div>
      )}
    </Layout>
  );
}
