import { cn } from "@/lib/utils";
import { Order } from "@/models/order";
import { formatCurrencyVND } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import {
  getOrderCode,
  isShowCancelOrderButton,
  isShowDeleteOrderButton,
} from "@/utils/helper";
import { Link } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import OrderStatusText from "../common/OrderStatus";
import { Button } from "../ui/button";
import { useDeleteOrder } from "@/hooks/api/orders/useDeleteOrder";
import { useCancelOrder } from "@/hooks/api/orders/useUpdateStatusOrder";

interface OrderListProps {
  data: Order[];
}
const OrderList = ({ data }: OrderListProps) => {
  const { mutate: deleteOrder } = useDeleteOrder({ isAdmin: false });
  const { mutate: cancelOrder } = useCancelOrder();
  const handleDeleteOrder = (id: string) => {
    deleteOrder(id);
  };

  const handleCancelOrder = (id: string) => {
    cancelOrder(id);
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Mã đơn hàng</th>
            <th className="px-4 py-2 text-left">Sản phẩm</th>
            <th className="px-4 py-2 text-left">Tổng tiền</th>
            <th className="px-4 py-2 text-left">Ngày đặt hàng</th>
            <th className="px-4 py-2 text-left">Trạng thái</th>
            <th className="px-4 py-2 text-left">Thanh toán</th>
            <th className="px-4 py-2 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: Order) => (
            <tr
              key={item?._id}
              className={cn("border-gray-200 border-b ", {
                "opacity-1": item.status,
                "!text-red-500":
                  item.orderStatus === "pending" ||
                  item.orderStatus === "isCancelled",
              })}
            >
              <td className="px-4 py-2">
                <Link
                  className="text-blue-500 underline"
                  to={
                    item.orderStatus !== "pending"
                      ? `/orders/${item?._id}`
                      : `/checkout/${item?._id}`
                  }
                >
                  {getOrderCode(item?._id)}
                </Link>
              </td>
              <td className="px-4 py-2">
                {item.orderItems.reduce((sum, item) => sum + item.qty, 0)}
              </td>
              <td className="px-4 py-2 font-bold">
                {formatCurrencyVND(item.totalPrice)}
              </td>
              <td className="px-4 py-2">{formatDate(item.createdAt)}</td>
              <td className="px-4 py-2">
                <OrderStatusText status={item.orderStatus} />
              </td>

              <td className="px-4 py-2">
                {item.isPaid ? (
                  <OrderStatusText
                    classNames="text-green-500"
                    status="Đã thanh toán"
                  />
                ) : (
                  <OrderStatusText status={"Chưa thanh toán"} />
                )}
              </td>
              <td className="px-4 py-2">
                {!item.isPaid && isShowCancelOrderButton(item.orderStatus) && (
                  <Button
                    variant={"outline"}
                    onClick={() => handleCancelOrder(item._id)}
                  >
                    Huỷ đơn
                  </Button>
                )}
                {isShowDeleteOrderButton(item.orderStatus) && (
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => handleDeleteOrder(item._id)}
                  >
                    <Trash />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
