import MainLayout from "@/components/client/layout";
import { Loading } from "@/components/common/Loading";
import OrderStatusText from "@/components/common/OrderStatus";
import { Button } from "@/components/ui/button";
import { useGetOrder } from "@/hooks/api/orders/useGetOrder";
import { useCancelOrder } from "@/hooks/api/orders/useUpdateStatusOrder";
import { Order } from "@/models/order";
import { formatCurrencyVND } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { getOrderCode, isShowCancelOrderButton } from "@/utils/helper";
import { createLazyFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/orders/$orderId/")({
  component: OrderDetail,
});

function OrderDetail() {
  const { orderId } = Route.useParams();
  const { isLoading, data } = useGetOrder(orderId);

  const { mutate: cancelOrder } = useCancelOrder();

  const handleCancelOrder = async () => {
    cancelOrder(orderId, {
      onError: () => {
        toast.error("Huỷ đơn hàng thất bại!, vui lòng liên hệ với chúng tôi");
      },
    });
  };
  return (
    <MainLayout classNames="min-h-[60vh]">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-2 py-4 w-full max-w-2xl">
          <div className="font-bold text-2xl">Chi tiết đơn hàng</div>
          <div>Mã đơn: {getOrderCode(data?._id)}</div>
          <div>Ngày đặt hàng: {formatDate(data?.createdAt ?? "")}</div>
          <div className="flex gap-2">
            Trạng thái: <OrderStatusText status={data?.orderStatus} />
          </div>

          <hr className="my-4" />
          {data?.orderItems?.map((item: Order["orderItems"][0]) => (
            <div key={item._id}>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    className="w-[50px] h-[50px] object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-black/[.8] text-base">
                      {item.name}
                    </span>
                    <span className="text-black/[.8] text-base">
                      size: {item.size}
                    </span>

                    <span className="text-black/[.8] text-base">
                      x{item.qty}
                    </span>
                  </div>
                </div>
                <div className="flex items-end font-bold">
                  {formatCurrencyVND(item.price)}
                </div>
              </div>
            </div>
          ))}
          <hr className="my-4" />
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg">Thanh toán</div>
              {data?.isPaid ? (
                <OrderStatusText
                  classNames="text-green-500"
                  status="Đã thanh toán"
                />
              ) : (
                <OrderStatusText status={"Chưa thanh toán"} />
              )}
              <div>
                Tổng cộng:{" "}
                <span className="font-bold">
                  {formatCurrencyVND(data?.totalPrice)}
                </span>
              </div>
              <span>
                Phương thức thanh toán:
                <span> {data?.paymentMethod?.toLocaleUpperCase()}</span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg">Thông tin vận chuyển</div>
              <span>Họ tên: {data?.shippingInfo?.customerName}</span>
              <span>Số điện thoại: {data?.shippingInfo?.phoneNumber}</span>
              <p>
                Địa chỉ: {data?.shippingInfo?.address},{" "}
                {data?.shippingInfo?.province?.name},{" "}
                {data?.shippingInfo?.district?.name},{" "}
                {data?.shippingInfo?.ward?.name}
              </p>
            </div>
          </div>
          {!data?.isPaid && isShowCancelOrderButton(data?.orderStatus) && (
            <Button
              onClick={handleCancelOrder}
              className="max-w-[100px]"
              variant={"destructive"}
            >
              Huỷ đơn
            </Button>
          )}
        </div>
      )}
    </MainLayout>
  );
}
